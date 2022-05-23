import {
  deleteDevice,
  registerDevice,
  readNotificationByBatch,
  loadServiceNotifications,
} from '../services';
import find from 'lodash/find';
import { Alert } from 'react-native';
import Messaging from '@react-native-firebase/messaging';
import { Functions, UserCache, Constants, FirebaseCache } from '../utils';

const {
  isObject,
  formatTime,
  filterArray,
  OpenURLButton,
  formatMonthDay,
  getDateTimeZone,
  getFamilyCategory,
} = Functions;

const { EVENTS_SERVICE_FASTLY_URL, getHomeProps } = Constants;

export const initFCM = async (userLoggedIn = false) => {
  Messaging()
    .registerDeviceForRemoteMessages()
    .then(() => {
      Messaging()
        .requestPermission()
        .then(() => {
          Messaging()
            .getToken()
            .then(token => {
              // console.log('deviceToken', token);
              if (!userLoggedIn) registerDevice(token);
            });

          Messaging().onMessage(async notification => {
            console.log('notificacion', notification);
            await UserCache.setNotifications({
              text: notification.data.text,
              date: new Date(),
            });
            alertNotificationAction(notification);
          });

          Messaging()
            .getInitialNotification()
            .then(notification =>
              setTimeout(() => initialNotificationAction(notification), 1000),
            )
            .catch(e => console.error('error getInitialNotification home', e));

          Messaging().onNotificationOpenedApp(notification =>
            initialNotificationAction(notification),
          );

          Messaging().onTokenRefresh(async token => {
            console.info('refreshDeviceToken');

            if ((await UserCache.getToken()) !== null) {
              deleteDevice()
                .then(() => registerDevice(token))
                .catch(error => {
                  if (error.response)
                    console.error('http error deleteDevice:', error.response);
                  else console.error('error deleteDevice:', error);
                  registerDevice(token);
                });
            }
          });
        })
        .catch(error => {
          console.log('request permission: ', error);
        });
    })
    .catch(error => {
      console.log('request device for remote messages: ', error);
    });
};

export const subscribeTopicLike = async eventSEO => {
  await Messaging().subscribeToTopic(`megusta_evento_${eventSEO}`);
};

export const unsubscribeTopicLike = async eventSEO => {
  await Messaging().unsubscribeFromTopic(`megusta_evento_${eventSEO}`);
};

export const subscribeTopicAttend = (eventSEO, year, month, day, time) => {
  if (eventSEO && year && month && day && time) {
    const formatHourMinute = formatTime(time);

    if (formatHourMinute) {
      Messaging().subscribeToTopic(
        `asistire_${eventSEO}_${year}_${formatMonthDay(
          month,
          day,
        )}_${formatHourMinute}`,
      );
    }
  }
};

export const unsubscribeTopicAttend = async (
  eventSEO,
  year,
  month,
  day,
  time,
) => {
  if (eventSEO && year && month && day && time) {
    const formatHourMinute = formatTime(time);

    if (formatHourMinute) {
      await Messaging().unsubscribeFromTopic(
        `asistire_${eventSEO}_${year}_${formatMonthDay(
          month,
          day,
        )}_${formatHourMinute}`,
      );
    }
  }
};

export const alertNotificationAction = async notification => {
  if (notification) {
    let textButtonAccept = 'Aceptar';
    let buttonsArray = [{ text: textButtonAccept, onPress: () => {} }];
    let title;
    let message;

    if (notification.title) title = notification.title;
    if (notification.notification && notification.notification.title)
      title = notification.notification.title;

    if (notification.message) message = notification.message;
    if (notification.notification && notification.notification.body)
      message = notification.notification.body;

    if ((title && title !== '') || (message && message !== '')) {
      if (
        isObject(notification.data) &&
        Object.keys(notification.data).length > 0
      ) {
        const { seo, url, section, batchId } = notification.data;

        if ((await UserCache.getToken()) !== null && batchId) {
          readNotificationByBatch(batchId)
            .then(() => loadNotifications())
            .catch(error => console.error(error));
        }

        if (seo) textButtonAccept = 'Ver evento';
        else if (url) textButtonAccept = 'Abrir enlace';
        else if (section) {
          switch (section) {
            case 'cartelera':
              textButtonAccept = 'Ir a Cartelera';
              break;
            case 'favoritos':
              textButtonAccept = 'Ir a Favoritos';
              break;
            case 'buscador':
              textButtonAccept = 'Ir a Buscador';
              break;
            default:
              break;
          }
        }

        buttonsArray = [
          { text: 'Cancelar', onPress: () => {} },
          {
            text: textButtonAccept,
            onPress: () => notificationAction(notification, getHomeProps()),
          },
        ];
      }

      Alert.alert(title, message, buttonsArray, { cancelable: false });
    }
  }
};

export const notificationAction = (
  notification,
  props,
  initNotifiGuestUser = false,
) => {
  if (
    props &&
    notification &&
    isObject(notification.data) &&
    Object.keys(notification.data).length > 0
  ) {
    const { seo, url, section } = notification.data;
    const { navigation } = props;

    if (seo) {
      const _source = {
        details_url: `${EVENTS_SERVICE_FASTLY_URL}event/${seo}`,
      };

      if (initNotifiGuestUser) {
        navigation.navigate('Dashboard');
        setTimeout(
          () => loadEventDetailsNotification(getHomeProps(), _source),
          100,
        );
      } else loadEventDetailsNotification(props, _source);
    } else if (url) OpenURLButton(url);
    else if (section) {
      switch (section) {
        case 'cartelera':
          navigation.navigate('Billboard');
          break;
        case 'citibanamex':
          navigation.navigate('Citibanamex');
          break;
        case 'favoritos':
          navigation.navigate('Favorites');
          break;
        case 'buscador':
          navigation.navigate('Search');
          break;
        default:
          break;
      }
    }
  }
};

export const loadNotifications = () => {
  loadServiceNotifications(1, 50)
    .then(({ data }) => {
      if (Array.isArray(data) && data.length > 0) {
        const findUnreadNotification = find(
          data,
          notification => !notification.isRead,
        );

        if (findUnreadNotification) getHomeProps().setNotificationsBadge(1);
        else getHomeProps().setNotificationsBadge(0);
      }
    })
    .catch(error => console.error(error));
};

export const loadEventDetailsNotification = (
  { navigation, loadEventDetails },
  _source,
) => {
  loadEventDetails(_source.details_url)
    .then(eventDetails => {
      _source.name = eventDetails.name;
      const isFamily = getFamilyCategory(eventDetails);

      navigation.navigate('EventDetailsAux', {
        _source,
        isFamily,
        isNotification: true,
      });
    })
    .catch(error => console.error('error loadEventDetailsNotification', error));
};

export const initialNotificationAction = async notification => {
  if (notification) {
    if (
      (await UserCache.getToken()) !== null &&
      isObject(notification.data) &&
      Object.keys(notification.data).length > 0 &&
      notification.data.batchId
    ) {
      readNotificationByBatch(notification.data.batchId)
        .then(() => loadNotifications())
        .catch(error => console.error(error));
    }

    clearBadgeNumber();
    notificationAction(notification, getHomeProps());
  }
};

export const clearBadgeNumber = () => {
  // if (platform === 'ios') PushNotificationIOS.setApplicationIconBadgeNumber(0);
  // else FCM.clearBadgeNumber();
};

export const loopSubscribeTopicLike = filterEventsLike => {
  for (let i = 0; i < filterEventsLike.length; i++) {
    setTimeout(async () => {
      subscribeTopicLike(filterEventsLike[i].body.seo);

      if (i === filterEventsLike.length - 1) {
        await FirebaseCache.setSyncEventsLike('synchronized');
      }
    }, i * 1000);
  }
};

export const initialSyncTopicLike = (eventsLike, isTokenRefresh = false) => {
  const filterEventsLike = filterArray(eventsLike);

  if (isTokenRefresh && filterEventsLike.length > 0) {
    // console.log('isTokenRefresh TopicLike');
    loopSubscribeTopicLike(filterEventsLike);
  } else {
    FirebaseCache.getSyncEventsLike()
      .then(initialEventsLike => {
        if (!initialEventsLike && filterEventsLike.length > 0) {
          loopSubscribeTopicLike(filterEventsLike);
        }
      })
      .catch(e => console.info('error AsyncStorage initialSyncTopicLike', e));
  }
};

export const loopSubscribeTopicAttend = filterEventsAttendance => {
  for (let i = 0; i < filterEventsAttendance.length; i++) {
    setTimeout(async () => {
      const {
        body: { event, date, time },
      } = filterEventsAttendance[i];
      const eventAttendanceDate = getDateTimeZone(new Date(date));

      subscribeTopicAttend(
        event ? event.seo : null,
        eventAttendanceDate.getFullYear(),
        eventAttendanceDate.getMonth() + 1,
        eventAttendanceDate.getDate(),
        time,
      );

      if (i === filterEventsAttendance.length - 1) {
        await FirebaseCache.setSyncEventsAttend('synchronized');
      }
    }, i * 1000);
  }
};

export const initialSyncTopicAttend = (
  eventsAttendance,
  isTokenRefresh = false,
) => {
  const filterEventsAttendance = filterArray(eventsAttendance);

  if (isTokenRefresh && filterEventsAttendance.length > 0) {
    loopSubscribeTopicAttend(filterEventsAttendance);
  } else {
    FirebaseCache.getSyncEventsAttend()
      .then(initialEventsAttend => {
        if (!initialEventsAttend && filterEventsAttendance.length > 0) {
          loopSubscribeTopicAttend(filterEventsAttendance);
        }
      })
      .catch(e => console.info('error AsyncStorage initialSyncTopicLike', e));
  }
};
