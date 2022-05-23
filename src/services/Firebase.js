import { DeviceCache } from '../utils';
import { Platform } from 'react-native';
import { NotificationsApi } from './Enpoinst';
import { NOTIFICATIONS_CONSTANTS, ROUTES } from '../utils/config/Constants';

export const registerDevice = async token => {
  (await NotificationsApi())
    .post(ROUTES.devices, {
      token,
      type: Platform.OS,
      os: `${Platform.OS}-${Platform.Version}`,
    })
    .then(async () => {
      console.info('deviceToken registered');
      await DeviceCache.setDeviceId(token);
    })
    .catch(error => {
      console.error('REGISTER DEVICE -->', error.response);
    });
};

export const deleteDevice = () =>
  DeviceCache.getDeviceId()
    .then(async deviceId =>
      (await NotificationsApi())
        .delete(`${ROUTES.devices}${deviceId}`)
        .then(response => Promise.resolve(response))
        .catch(error => Promise.reject(error)),
    )
    .catch(e => Promise.reject(e));

// --------------------- Notifications --------------------------
export const readNotificationByBatch = async (
  id,
  source = NOTIFICATIONS_CONSTANTS.sourcePush,
) =>
  (await NotificationsApi()).post(`${ROUTES.readNotificationByBatch}${id}`, {
    source,
  });

export const loadServiceNotifications = async (
  page = 1,
  size = NOTIFICATIONS_CONSTANTS.number,
) =>
  (await NotificationsApi()).get(ROUTES.notifications, {
    params: { page, size },
  });
