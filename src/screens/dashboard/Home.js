import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  PermissionsAndroid,
  View,
} from 'react-native';
import _ from 'lodash';
import { UserCache } from '../../utils';
import { Banners } from '../../assets/img';
import * as Actions from '../../redux/actions';
import FastImage from 'react-native-fast-image';
import { useTheme } from '@ui-kitten/components';
import { loadPostponedEvents } from '../../services';
import { useSelector, useDispatch } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {
  CarouselImages,
  Container,
  Manageable,
  Spinner,
} from '../../components';
import Carousel from 'react-native-snap-carousel';
import SwiperFlatList from 'react-native-swiper-flatlist';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  const [token, setToken] = useState(false);
  const [Refreshing, setRefreshing] = useState(false);
  const [spinnerPostponedEvents, setSpinnerPostponedEvents] = useState(false);
  const [postponedEventsData, setPostponedEventsData] = useState([]);

  const dispatch = useDispatch();
  const { Search, Tastes } = useSelector(state => state);

  useEffect(() => {
    if (Platform.OS === 'android') requestPermissionAndroid();
    else getCurrentPositionIos();
    validateToken();
    getData();
  }, []);

  const loadPostponedEvent = () => {
    setSpinnerPostponedEvents(true);

    loadPostponedEvents()
      .then(data => {
        setPostponedEventsData(data);
      })
      .catch(() => {
        setPostponedEventsData([]);
      })
      .finally(() => {
        setSpinnerPostponedEvents(false);
      });
  };

  const validateToken = async () => {
    if ((await UserCache.getToken()) !== null) setToken(true);
    else setToken(false);
  };

  const getData = () => {
    setRefreshing(true);

    loadPostponedEvent();
    dispatch(Actions.loadSlider());
    dispatch(Actions.loadMSICatalog());
    dispatch(Actions.loadManageableContent());
    dispatch(Actions.loadMusicGenreProfiler());
    dispatch(Actions.loadRecommendations());
    dispatch(Actions.loadTrendings());
    dispatch(Actions.loadFamilyEvents());
    dispatch(Actions.loadGeneralEvents());
    dispatch(Actions.loadTheaterEvents());
    dispatch(Actions.loadDriveInEvents());
    dispatch(Actions.loadDriveInAllEvents());
    dispatch(Actions.loadPalcosEvents());
    dispatch(Actions.loadStreamingEvents());
    dispatch(Actions.loadEventProfiler());
    dispatch(Actions.loadPresalesCitibanamex());
    dispatch(Actions.loadDigitalEvents());

    setTimeout(() => setRefreshing(false), 1000);
  };

  const loadEndpointsWithPosition = (position = null) => {
    dispatch(Actions.loadManageableContent());
    dispatch(Actions.loadMusicGenreProfiler());
    dispatch(Actions.loadRecommendations(position));
    dispatch(Actions.loadTrendings(position));
    dispatch(Actions.loadFamilyEvents(position));
    dispatch(Actions.loadGeneralEvents(position));
    dispatch(Actions.loadTheaterEvents(position));
    dispatch(Actions.loadDriveInEvents());
    dispatch(Actions.loadDriveInAllEvents());
    dispatch(Actions.loadPalcosEvents());
    dispatch(Actions.loadStreamingEvents());
    dispatch(Actions.loadEventProfiler());
    dispatch(Actions.loadPresalesCitibanamex());
    dispatch(Actions.loadDigitalEvents(null));
    dispatch(Actions.loadCurrentPosition(position));
    dispatch(Actions.loadVenues());
  };

  const dataSlider = [
    !Search.show_slider_spinner && token
      ? {
          img: Banners.BtnADN,
          onPress: () =>
            navigation.navigate('Auth', { screen: 'WelcomeTastes' }),
        }
      : null,
    {
      img: Banners.BtnShop,
      onPress: () =>
        navigation.navigate('Webview', {
          url: 'https://shop.ticketmaster.com.mx/',
          nombre: 'Ticketmaster Shop',
        }),
    },
  ];

  const getMyLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        async position => {
          const positionFormat =
            position.coords.latitude + ':' + position.coords.longitude;
          loadEndpointsWithPosition(positionFormat);

          await UserCache.setLocation({
            latitud: position.coords.latitude,
            longitud: position.coords.longitude,
          });

          resolve(positionFormat);
        },
        error => {
          console.warn('error get current position', error);
          reject(error);
        },
        { enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 },
      );
    });
  };

  const requestPermissionAndroid = async () => {
    const permission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (permission) {
      await getMyLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          await getMyLocation();
        } else {
          console.warn('Permisos denegados para android');
          loadEndpointsWithPosition();
        }
      } catch (error) {
        console.warn('error permissions android', err);
        loadEndpointsWithPosition();
      }
    }
  };

  const getCurrentPositionIos = async () => {
    const auth = await Geolocation.requestAuthorization('whenInUse');

    if (auth === 'granted') {
      await getMyLocation();
    } else {
      console.warn('Permisos denegados para ios');
      loadEndpointsWithPosition();
    }
  };

  const renderRecommendationsSpinner = async spinnerRecommendations => {
    if ((await UserCache.getToken()) !== null && spinnerRecommendations) {
      return true;
    }
    return false;
  };

  const getDataManageable = () => {
    let recommendations = false;
    renderRecommendationsSpinner(Search.show_spinner_recommendations).then(
      resp => {
        recommendations = resp;
      },
    );
    let dataMusicGenreProfiler = null;
    if (
      Tastes.load_music_genre_profiler_success.length > 0 &&
      !Tastes.load_music_genre_profiler_fail.error
    ) {
      dataMusicGenreProfiler = _.orderBy(
        Tastes.load_music_genre_profiler_success.map(item => {
          return { ...item, percentage: Number(item.percentage) };
        }),
        ['percentage', 'genre'],
        ['desc', 'asc'],
      );

      dataMusicGenreProfiler = dataMusicGenreProfiler.map((item, index) => {
        return {
          active: true,
          data: item.data,
          dataFixedCard: {},
          errorLoadData: Tastes.load_music_genre_profiler_fail.error,
          hideCarousel: true,
          order: 16 + index,
          screen: 'home',
          spinner: Tastes.show_music_genre_profiler_spinner,
          title: item.genre,
          type: 'carousel',
        };
      });
    }

    // fc: Fixed Card  => Datos de cada tarjeta fija para cada carrusel
    let fcEnTendencia = null;
    let fcEventosModificados;
    let fcIrrepetible = null;
    let fcRecomendados = null;
    let fcEventos = null;
    let fcFamiliares = null;
    let fcTeatro = null;
    let fcPreventas = null;
    let fcAutoconciertos = null;
    let fcPalcos = null;
    let fcStreamings = null;
    let fcCustomFeed = null;

    if (
      Search.load_manageable_content_success.length > 0 &&
      !Search.load_manageable_content_fail.error
    ) {
      Search.load_manageable_content_success.map(data => {
        switch (data.componentDefault) {
          case 'default-1': {
            fcEnTendencia = data.fixedCardElements;
            break;
          }
          case 'default-3': {
            fcEventosModificados = data.fixedCardElements;
            break;
          }
          case 'default-6': {
            fcIrrepetible = data.fixedCardElements;
            break;
          }
          case 'default-8': {
            fcRecomendados = data.fixedCardElements;
            break;
          }
          case 'default-2': {
            fcEventos = data.fixedCardElements;
            break;
          }
          case 'default-4': {
            fcFamiliares = data.fixedCardElements;
            break;
          }
          case 'default-9': {
            fcTeatro = data.fixedCardElements;
            break;
          }
          case 'default-7': {
            fcPreventas = data.fixedCardElements;
            break;
          }
          case 'default-10': {
            fcAutoconciertos = data.fixedCardElements;
            break;
          }
          case 'default-11': {
            fcPalcos = data.fixedCardElements;
            break;
          }
          case 'default-12': {
            fcStreamings = data.fixedCardElements;
            break;
          }
          case 'default-13': {
            fcCustomFeed = data.fixedCardElements;
            break;
          }
        }
      });
    }

    let dataComponents = [
      {
        data: Search.load_trendings_success,
        region: true,
        spinner: Search.show_trendings_spinner,
        errorLoadData: Search.load_trendings_fail.error,
        dataFixedCard: fcEnTendencia,
        componentDefault: 'default-1',
        spinnerDataComponent: Search.show_trendings_spinner,
        errorDataComponent: Search.load_trendings_fail.error,
      },
      {
        data: Search.load_general_events_success,
        region: true,
        spinner: Search.show_general_events_spinner,
        errorLoadData: Search.load_general_events_fail.error,
        dataFixedCard: fcEventos,
        componentDefault: 'default-2',
        spinnerDataComponent: Search.show_general_events_spinner,
        errorDataComponent: Search.load_general_events_fail.error,
      },
      {
        data: postponedEventsData,
        postponed: true,
        spinner: spinnerPostponedEvents,
        errorLoadData: false,
        dataFixedCard: fcEventosModificados,
        titleStyle: { width: 170 },
        componentDefault: 'default-3',
        spinnerDataComponent: spinnerPostponedEvents,
        errorDataComponent: false,
      },
      {
        data: Search.load_family_events_success,
        region: true,
        spinner: Search.show_family_events_spinner,
        errorLoadData: Search.load_family_events_fail.error,
        dataFixedCard: fcFamiliares,
        componentDefault: 'default-4',
        spinnerDataComponent: Search.show_family_events_spinner,
        errorDataComponent: Search.load_family_events_fail.error,
      },
      {
        componentDefault: 'default-5',
      },
      {
        data: Search.load_digital_events_success,
        spinner: Search.show_digital_events_spinner,
        errorLoadData: Search.load_digital_events_fail.error,
        dataFixedCard: fcIrrepetible,
        componentDefault: 'default-6',
        spinnerDataComponent: Search.show_digital_events_spinner,
        errorDataComponent: Search.load_digital_events_fail.error,
      },
      {
        data: Search.load_presales_citibanamex_success,
        presales: true,
        spinner: Search.show_presales_citibanamex_spinner,
        errorLoadData: Search.load_presales_citibanamex_fail.error,
        dataFixedCard: fcPreventas,
        componentDefault: 'default-7',
        spinnerDataComponent: Search.show_presales_citibanamex_spinner,
        errorDataComponent: Search.load_presales_citibanamex_fail.error,
      },
      {
        data: Search.load_recommendations_success,
        region: true,
        spinner: recommendations,
        errorLoadData: Search.load_recommendations_fail.error,
        dataFixedCard: fcRecomendados,
        componentDefault: 'default-8',
        spinnerDataComponent: recommendations,
        errorDataComponent: Search.load_recommendations_fail.error,
      },
      {
        data: Search.load_theater_events_success,
        region: true,
        spinner: Search.show_theater_events_spinner,
        errorLoadData: Search.load_theater_events_fail.error,
        dataFixedCard: fcTeatro,
        componentDefault: 'default-9',
        spinnerDataComponent: Search.show_theater_events_spinner,
        errorDataComponent: Search.load_theater_events_fail.error,
      },
      {
        data: Search.load_drivein_events_success,
        dataFixedCard: fcAutoconciertos,
        errorLoadData: Search.load_drivein_events_fail.error,
        spinner: Search.show_drivein_events_spinner,
        componentDefault: 'default-10',
        spinnerDataComponent: Search.show_drivein_events_spinner,
        errorDataComponent: Search.load_drivein_events_fail.error,
      },
      {
        data: Search.load_palcos_events_success,
        dataFixedCard: fcPalcos,
        errorLoadData: Search.load_palcos_events_fail.error,
        spinner: Search.show_palcos_events_spinner,
        componentDefault: 'default-11',
        spinnerDataComponent: Search.show_palcos_events_spinner,
        errorDataComponent: Search.load_palcos_events_fail.error,
      },
      {
        data: Search.load_streaming_events_success,
        dataFixedCard: fcStreamings,
        errorLoadData: Search.load_streaming_events_fail.error,
        spinner: Search.show_streaming_events_spinner,
        componentDefault: 'default-12',
        spinnerDataComponent: Search.show_streaming_events_spinner,
        errorDataComponent: Search.load_streaming_events_fail.error,
      },
      {
        data: Tastes.load_event_profiler_success,
        dataFixedCard: fcCustomFeed,
        spinner: Tastes.show_event_profiler_spinner,
        errorLoadData: Tastes.load_event_profiler_fail.error,
        componentDefault: 'default-13',
        spinnerDataComponent: Tastes.show_event_profiler_spinner,
        errorDataComponent: Tastes.load_event_profiler_fail.error,
      },
    ];

    if (
      !Search.load_manageable_content_fail.error &&
      Search.load_manageable_content_success.length > 0
    ) {
      Search.load_manageable_content_success.map(data => {
        if (data.componentDefault !== 'new') {
          dataComponents.map(async component => {
            if (data.componentDefault === component.componentDefault) {
              component.active = data.active;
              component.hideCarousel = data.hideCarousel;
              component.order = data.order;
              component.screen = data.screen;
              component.title = data.name;
              component.type = data.type;

              if (data.componentDefault === 'default-8') {
                component.active = (await UserCache.getToken())
                  ? data.active
                  : false;
              } else if (data.componentDefault === 'default-5') {
                component.data = data.elements;
                component.spinner = Search.show_manageable_content_spinner;
              } else if (data.componentDefault === 'default-2') {
                component.active = (await UserCache.getToken())
                  ? false
                  : data.active;
              } else if (data.componentDefault === 'default-13') {
                component.active = (await UserCache.getToken())
                  ? data.active
                  : false;
              }
            }
          });
        } else {
          if (data.elements.length > 0) {
            const newComponent = {
              active: data.active,
              data: data.elements,
              dataFixedCard: data.fixedCardElements,
              errorLoadData: Search.load_manageable_content_fail.error,
              hideCarousel: data.hideCarousel,
              order: data.order,
              screen: data.screen,
              spinner: Search.show_manageable_content_spinner,
              title: data.name,
              type: data.type,
            };

            dataComponents.push(newComponent);
          }
        }
      });
    }

    dataComponents = dataComponents.concat(
      dataMusicGenreProfiler !== null ? dataMusicGenreProfiler : [],
    );

    return dataComponents;
  };

  return (
    <Container
      withBar={{ colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-default'],
        title: 'Cerca de ti',
        align: 'start',
        // accessoryLeft: {
        //   name: 'cog',
        //   type: 'font-awesome-5',
        //   onPress: () => navigation.navigate('Settings'),
        // },
        accessoryRight: {
          name: 'bell',
          type: 'font-awesome-5',
          solid: true,
          onPress: () => navigation.navigate('Notifications'),
        },
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={Refreshing}
            onRefresh={getData}
            title="Cargando contenido, porfavor espere..."
            tincolor={theme['color-info-default']}
            colors={[theme['color-info-default']]}
            titleColor={theme['color-basic-default']}
          />
        }>
        <CarouselImages
          data={Search.load_slider_success}
          navigation={navigation}
          spinner={Search.show_slider_spinner}
          error={Search.load_slider_fail.error}
        />

        <SwiperFlatList
          data={dataSlider.filter(item => item !== null)}
          autoplay
          autoplayLoop
          showPagination
          autoplayDelay={5}
          paginationActiveColor={theme['color-info-500']}
          paginationDefaultColor={theme['color-basic-100']}
          pageIndicatorStyle={{ backgroundColor: theme['color-basic-100'] }}
          paginationStyleItem={{ height: 6, width: 6, marginHorizontal: 4 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                height: 100,
                width,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={item.onPress}>
              <FastImage
                style={{
                  height: 80,
                  width: '95%',
                  borderRadius: 10,
                }}
                source={item.img}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
          )}
          inactiveSlideOpacity={1}
          activeSlideAlignment="start"
        />

        <View style={{ width: '100%' }}>
          {!Search.show_manageable_content_spinner &&
            !Search.load_manageable_content_fail.error && (
              <Manageable
                data={getDataManageable()}
                navigation={navigation}
                screen="home"
              />
            )}

          <Spinner visible={Search.show_manageable_content_spinner} />
        </View>
        <TouchableOpacity
          style={{
            height: 70,
            width: '100%',
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() =>
            navigation.navigate('Webview', {
              url: 'https://www.banamex.com/solicita-tu-tarjeta-credito-en-linea/typ.html',
              nombre: 'Tarjetas citibanamex',
            })
          }>
          <FastImage
            style={{
              height: 40,
              width: 300,
              borderRadius: 5,
            }}
            source={Banners.BCity}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;
