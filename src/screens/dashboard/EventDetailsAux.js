import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Share,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Tab,
  Icon,
  Text,
  Button,
  TabView,
  useTheme,
  List,
  Divider,
} from '@ui-kitten/components';
import {
  Loading,
  Container,
  SponsorsList,
  Carousel,
  PriceRangeEventDetails,
  ModalCard,
} from '../../components';
import * as FirebaseService from '../../firebase';
import moment from 'moment';
import 'moment/locale/es-mx';
import Toast from 'react-native-root-toast';
import HTMLView from 'react-native-htmlview';
import FastImage from 'react-native-fast-image';
import EventDatesAuxScreen from './EventDatesAux';
import { Col, Row } from 'react-native-easy-grid';
import RBSheet from 'react-native-raw-bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import { useSelector, useDispatch } from 'react-redux';
import { Constants, Styles, UserCache } from '../../utils';
import { Popup } from 'react-native-map-link';
import { getStateShortName } from '../../utils/config/Functions';
import * as Actions from '../../redux/actions';

const { deviceWidth, STYLES_HTML_TAGS } = Constants;

const EventDetailsAuxScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const { url, name, suggestion, deleteInfo, search } = route.params;

  const [token, setToken] = useState(false);
  const [position, setPosition] = useState({});
  const [favorite, setfavorite] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [textSelect, setTextSelect] = useState(false);
  const [visiblePopover, setVisiblePopover] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modal, setmodal] = useState({
    visible: false,
    text: undefined,
    title: undefined,
    icon: { name: '' },
  });

  const refRBSheetCheckIn = useRef();
  const refRBSheetMyEvents = useRef();
  const { Search, MyInterest } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getChekIn());
  }, [
    MyInterest.show_save_checkin_spinner,
    MyInterest.show_delete_checkin_spinner,
  ]);

  const eventError = useSelector(state => state.Search.load_event_details_fail);

  useEffect(() => {
    const Validate = async () => {
      if ((await UserCache.getToken()) !== null) {
        setToken(true);
      } else {
        setToken(false);
      }
    };

    Validate();
    getPosition();
    dispatch(Actions.loadEventDetails(url));
    FirebaseService.trackScreen(FirebaseService.pageName.profile);
  }, []);

  useEffect(() => {
    if (Object.keys(Search.load_event_details_success).length > 0) {
      dispatch(
        Actions.saveEventProfiler({
          datas: [
            {
              artist: undefined,
              venue: Search.load_event_details_success.dates[0].venue.name,
              genre: undefined,
              banner_name: undefined,
              event_name: Search.load_event_details_success.name,
              search: Search.load_event_details_success.dates[0].state,
            },
          ],
        }),
      );
    }
  }, [Search.show_event_details_spinner]);

  const getPosition = async () => {
    const getDataPosition = await UserCache.getLocation();
    setPosition(getDataPosition);
  };

  const shareInformation = (name, venue, state, date, url) => {
    const ticketsUrl = url;
    let shareMessage = `${name}\n${venue}\n${state}\n${date}\n\nComprar boletos: ${ticketsUrl}`;

    if (!ticketsUrl) shareMessage = `${name}\n${venue}\n${state}\n${date}`;

    Share.share({
      message: shareMessage,
      title: name,
    });
  };

  const renderStarIcon = async () => {
    if (await UserCache.getToken()) {
      if (!favorite) {
        dispatch(
          Actions.saveMyEventInterest(Search.load_event_details_success.id),
        );
        setfavorite(true);
        // trackEvent(
        //   "detalle-evento",
        //   "meInteresa",
        //   this.state.eventDetailsArray.name
        // );
      } else {
        dispatch(
          Actions.deleteMyEventInterest(
            Search.load_event_details_success.id,
            Search.load_event_details_success.seo,
          ),
        );
        setfavorite(false);
      }
    } else {
      Toast.show('Debe iniciar sesión para guardar favoritos', {
        duration: 4000,
        position: Toast.positions.CENTER,
      });
    }
  };

  const readMore = () => {
    setTextShown(!textShown);
  };

  const selectPresale = () => {
    setTextSelect(!textSelect);
  };

  const handleSaveCheckIn = () => {
    refRBSheetCheckIn.current.close();

    dispatch(
      Actions.saveChekIn({
        event_name: Search.load_event_details_success.name,
        venue: Search.load_event_details_success.dates[0].venueName,
        image_url: Search.load_event_details_success.squaredImageUrl,
        date: Search.load_event_details_success.dates[0].date,
        checkin: true,
        event_id: Search.load_event_details_success.id,
      }),
    );
  };

  const RenderIcon = ({ props, name, size }) => (
    <Icon
      {...props}
      name={name}
      pack="font-awesome-5"
      solid={props.style.tintColor !== theme['color-basic-600']}
      style={{ fontSize: size ? size : 15, color: '#fff' }}
    />
  );

  const deleteData = () => {
    if (deleteInfo) {
      dispatch(Actions.clearEventDetails());
    } else {
      dispatch(Actions.clearEventDetails());
      dispatch(Actions.clearArtist());
    }
  };

  const validateDistance = () => {
    const dateDay = moment(
      Search.load_event_details_success.dates[0].date,
    ).format('D');
    const datemonth = moment(
      Search.load_event_details_success.dates[0].date,
    ).format('MM');
    const dateHour = moment(
      Search.load_event_details_success.dates[0].date,
    ).format('h');
    const min = 0.25;
    console.log(datemonth, moment().format('MM'));
    if (getDistance() >= min) {
      if (dateDay === moment().format('D')) {
        if (datemonth === moment().format('MM')) {
          if (moment().format('h') >= dateHour - 1) return false;
        }
      }
    } else return true;
  };
  const openRBSheets = () => {
    // refRBSheetCheckIn.current.open();
    refRBSheetMyEvents.current.open();
  };

  const getDistance = () => {
    if (Object.keys(position).length > 0) {
      var rad = function (x) {
        return (x * Math.PI) / 180;
      };
      var R = 6378.137; //Radio de la tierra en km
      var dLat = rad(
        Search.load_event_details_success.dates[0].venueLocalization.lat -
          position.latitud,
      );
      var dLong = rad(
        Search.load_event_details_success.dates[0].venueLocalization.lng -
          position.longitud,
      );
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(position.latitud)) *
          Math.cos(
            rad(
              Search.load_event_details_success.dates[0].venueLocalization.lat,
            ),
          ) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d.toFixed(2); //Retorna tres decimales
    }
    return 0;
  };

  const renderCheckIn = () => {
    const dateSheetButton = moment(
      Search.load_event_details_success.dates[0].date,
    ).format('ddd, MMM D  h:mm A');
    const dayWithoutComa = dateSheetButton.replace('.,', ',');
    const montWithoutComa = dayWithoutComa.replace('.', '');
    const dateFormatFinish = montWithoutComa.toUpperCase();

    return (
      <>
        <Text
          style={{
            fontSize: 22,
            color: theme['color-primary-600'],
            fontWeight: 'bold',
          }}>
          Conciertos
        </Text>
        <Text
          category={'c1'}
          style={{ color: theme['color-basic-600'], marginTop: 10 }}>
          Bienvenido, sabemos que estás aquí:{' '}
        </Text>
        <FastImage
          style={{
            height: 150,
            width: '100%',
            borderRadius: 5,
            marginTop: 15,
          }}
          source={{
            uri: Search.load_event_details_success.horizontalImageUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text
          style={{
            color: theme['color-danger-default'],
            fontSize: 14,
            marginTop: 15,
          }}>
          {dateFormatFinish}
        </Text>
        <Text style={{ color: '#6C6C6C', fontWeight: 'bold', marginTop: 3 }}>
          {Search.load_event_details_success.name}
        </Text>
        <Row style={{ marginTop: 5, maxHeight: 20 }}>
          <Col>
            <Text category={'c1'} style={{ color: theme['color-basic-600'] }}>
              {Search.load_event_details_success.dates[0].venueName}
            </Text>
          </Col>
          <Col>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-end',
              }}>
              <Icon
                name="map-marker-alt"
                pack="font-awesome-5"
                style={{
                  fontSize: 12,
                  color: theme['color-basic-500'],
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: theme['color-basic-500'],
                  marginLeft: 5,
                }}>
                {Object.keys(Search.load_event_details_success).length > 0
                  ? getDistance()
                  : 0}{' '}
                km
              </Text>
            </View>
          </Col>
        </Row>
        <View style={{ width: '100%', height: 150, borderRadius: 10 }}>
          {Object.keys(position).length > 0 ? (
            <MapView
              style={{ flex: 1 }}
              region={{
                latitude: position.latitud,
                longitude: position.longitud,
                latitudeDelta: 0.0143,
                longitudeDelta: 0.0134,
              }}
              showsUserLocation
              loadingEnabled>
              {Object.keys(Search.load_event_details_success).length > 0 ? (
                <Marker
                  title={Search.load_event_details_success.name}
                  coordinate={{
                    latitude:
                      Search.load_event_details_success.dates[0]
                        .venueLocalization.lat,
                    longitude:
                      Search.load_event_details_success.dates[0]
                        .venueLocalization.lng,
                  }}
                />
              ) : null}
            </MapView>
          ) : null}
        </View>
        <View style={[Styles.containerModal, { height: 185 }]}>
          <View style={{ marginTop: -40, width: '100%' }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
                textAlign: 'center',
              }}>
              Haz Check-In y compártelo en tus redes sociales
            </Text>
          </View>
          <Button
            style={{ marginTop: 40 }}
            accessoryRight={props => <RenderIcon props={props} name="star" />}
            onPress={handleSaveCheckIn}>
            Check-In
          </Button>
        </View>
      </>
    );
  };

  const renderMyEvents = () => {
    return (
      <>
        <Text style={{ color: '#fff', marginTop: 30 }}>
          Eventos a los que has asistido
        </Text>
        <List
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            marginTop: 15,
            maxHeight: 470,
            marginBottom: 30,
          }}
          data={MyInterest.load_get_checkin_success}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
        <View style={{ alignItems: 'center' }}>
          <Button
            style={{ width: 200 }}
            onPress={() => {
              refRBSheetMyEvents.current.close();
              // refRBSheetCheckIn.current.close();
            }}>
            Cerrar
          </Button>
        </View>
      </>
    );
  };

  const renderItem = ({ item, index }) => {
    const dateMyEvents = moment(item.date).format('dddd, MMM D YYYY  h:mm A');
    const dayMyEvents = dateMyEvents.replace('.,', ',');
    const montMyEvents = dayMyEvents.replace('.', '');
    const dateFinish = montMyEvents.toUpperCase();

    return (
      <Row style={{ maxHeight: 150 }}>
        <Col
          size={35}
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <FastImage
            style={{
              height: 100,
              width: 100,
              borderRadius: 5,
              marginTop: 15,
              marginBottom: 15,
            }}
            source={{
              uri: item.image_url,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Col>
        <Col size={65} style={{ marginLeft: 3 }}>
          <Text
            numberOfLines={1}
            style={{ color: '#FF0036', fontSize: 12, marginTop: 15 }}>
            {dateFinish}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
            {item.event_name}
          </Text>
          <Text
            numberOfLines={1}
            category={'c1'}
            style={{ color: theme['color-basic-600'] }}>
            {item.venue}
          </Text>

          <Row style={{ maxHeight: 40 }}>
            <Col style={{ marginTop: 5 }}>
              {item.checkin ? (
                <Button
                  size="small"
                  style={{ width: 100, height: 20, borderRadius: 20 }}
                  accessoryRight={props => (
                    <RenderIcon props={props} name="star" size={10} />
                  )}
                  onPress={() => dispatch(Actions.deleteChekIn(item.id))}>
                  Check
                </Button>
              ) : null}
            </Col>

            <Col style={{ marginTop: 5, alignItems: 'flex-end' }}>
              <Button
                size="small"
                style={{
                  borderRadius: 0,
                  backgroundColor: '#3b5998',
                  borderColor: '#3b5998',
                  width: 70,
                  height: 20,
                }}
                accessoryLeft={props => (
                  <RenderIcon props={props} name="facebook-square" size={12} />
                )}
                onPress={() => {
                  shareInformation(
                    Search.load_event_details_success.name,
                    Search.load_event_details_success.dates[0].venue.name,
                    Search.load_event_details_success.dates[0].state,
                    moment(),
                    Search.load_event_details_success.ticketMasterUrl,
                  );
                }}
                disabled={!item.checkin ? true : false}>
                Share
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  const renderPopover = () => {
    if (
      Object.keys(Search.load_event_details_success).length > 0 &&
      Object.keys(position).length > 0
    ) {
      const options = {
        latitude:
          Search.load_event_details_success.dates[0].venueLocalization.lat,
        longitude:
          Search.load_event_details_success.dates[0].venueLocalization.lng,
        sourceLatitude: position.latitud,
        sourceLongitude: position.longitud,
        title: Search.load_event_details_success.dates[0].venue.name,
        dialogTitle: '¿Cómo llegar?',
        dialogMessage: 'Elige la app de tu preferencia',
        cancelText: 'Cancelar',
      };
      return (
        <Popup
          isVisible={visiblePopover}
          onCancelPressed={() => setVisiblePopover(false)}
          onAppPressed={() => setVisiblePopover(false)}
          onBackButtonPressed={() => setVisiblePopover(false)}
          options={options}
          style={{
            titleText: {
              color: '#002d72',
              fontSize: 16,
            },
            subtitleText: {
              color: '#686868',
              fontSize: 14,
            },
            itemText: {
              color: '#686868',
              fontSize: 14,
            },
            cancelButtonText: {
              color: '#00bdf2',
              fontSize: 16,
            },
          }}
        />
      );
    }
  };

  const EventDetailsAuxTab = () => {
    const date = `${moment(
      Search.load_event_details_success.dates[0].date,
    ).format('LL')}`;

    return (
      <Container>
        <ModalCard
          visible={modal.visible}
          dataIcon={modal.icon}
          title={modal.title}
          text={modal.text}
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: () => {
              setmodal({ ...modal, visible: false });
            },
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[Styles.container]}>
            <View style={{ height: 170 }}>
              <Row>
                <Col style={{ alignItems: 'flex-start' }}>
                  <FastImage
                    style={{ height: 150, width: 150, borderRadius: 15 }}
                    source={{
                      uri: Search.load_event_details_success.squaredImageUrl,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </Col>

                <Col
                  style={{
                    paddingLeft: deviceWidth > 320 ? -10 : 25,
                  }}>
                  <View style={{ paddingRight: 20 }}>
                    <Text
                      category="label"
                      numberOfLines={2}
                      style={{ color: theme['color-primary-600'] }}>
                      {Search.load_event_details_success.name}
                    </Text>

                    <Text
                      category="p2"
                      style={{ marginTop: 5 }}
                      numberOfLines={1}>
                      {date}
                    </Text>

                    <TouchableOpacity
                      onPress={() => setVisiblePopover(true)}
                      style={styles.iconText}>
                      <Icon
                        name="map-marker-alt"
                        pack="font-awesome-5"
                        style={styles.icons}
                      />

                      <Text category="p2">
                        {getStateShortName(
                          Search.load_event_details_success.dates[0].stateRef,
                        )}{' '}
                        /{' '}
                        {Search.load_event_details_success.dates[0].venue.name}
                      </Text>
                    </TouchableOpacity>
                    {renderPopover()}

                    <TouchableOpacity
                      onPress={() => setSelectedIndex(1)}
                      style={styles.touch}>
                      <View style={styles.iconText}>
                        <Icon
                          name="calendar-week"
                          pack="font-awesome-5"
                          style={styles.icons}
                        />
                        <Text category="p2">Ver todas las fechas</Text>
                      </View>
                    </TouchableOpacity>

                    <View style={styles.iconIcon}>
                      <TouchableOpacity
                        onPress={() => {
                          shareInformation(
                            Search.load_event_details_success.name,
                            Search.load_event_details_success.dates[0].venue
                              .name,
                            Search.load_event_details_success.dates[0].state,
                            date,
                            Search.load_event_details_success.ticketMasterUrl,
                          );
                        }}>
                        <Icon
                          name="share-alt"
                          pack="font-awesome-5"
                          style={{
                            height: 20,
                            width: 20,
                            marginRight: 15,
                            color: theme['color-info-500'],
                          }}
                        />
                      </TouchableOpacity>
                      {token ? (
                        <TouchableOpacity onPress={() => renderStarIcon()}>
                          {!favorite ? (
                            <Icon
                              name="heart"
                              pack="font-awesome-5"
                              style={{
                                height: 20,
                                width: 20,
                                marginRight: -10,
                                color: theme['color-info-500'],
                              }}
                            />
                          ) : (
                            <Icon
                              name="heart"
                              pack="font-awesome-5"
                              solid
                              style={{
                                height: 20,
                                width: 20,
                                marginRight: -10,
                                color: theme['color-info-500'],
                              }}
                            />
                          )}
                        </TouchableOpacity>
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                </Col>
              </Row>
            </View>

            <Text
              category="label"
              numberOfLines={1}
              style={{ color: theme['color-primary-600'] }}>
              Beneficios Citibanamex
            </Text>
            <TouchableOpacity
              onPress={() => selectPresale()}
              style={styles.touch}>
              <View style={styles.iconSelect}>
                <Icon name="star" pack="font-awesome-5" style={styles.icons} />
                <Text category="p2" style={{ marginLeft: 20, marginRight: 80 }}>
                  Preventa Citibanamex
                </Text>
                <Icon
                  name={textSelect ? 'chevron-up' : 'chevron-down'}
                  pack="font-awesome-5"
                  style={styles.icons}
                />
              </View>
            </TouchableOpacity>
            {textSelect ? (
              <Text category="p2" style={{ marginTop: 20 }}>
                Términos y condiciones
              </Text>
            ) : null}

            <PriceRangeEventDetails
              minimalPrice={
                Search.load_event_details_success.dates[0].minimalPrice
              }
              maximumPrice={
                Search.load_event_details_success.dates[0].maximumPrice
              }
            />

            {Search.load_event_details_success?.dates[0]?.sponsors instanceof
              Array &&
              Search.load_event_details_success?.dates[0]?.sponsors.length >
                0 && (
                <SponsorsList
                  sponsors={Search.load_event_details_success.dates[0].sponsors}
                />
              )}

            <Button
              status="success"
              style={styles.button}
              onPress={() =>
                navigation.navigate('Webview', {
                  nombre: Search.load_event_details_success.name,
                  url: Search.load_event_details_success.ticketMasterUrl,
                })
              }>
              Comprar Boletos
            </Button>

            {token ? (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}>
                {validateDistance() ? (
                  <View>
                    <Button
                      accessoryRight={props => (
                        <RenderIcon props={props} name="star" />
                      )}
                      style={{
                        width: 150,
                        marginRight: 10,
                      }}
                      onPress={() => refRBSheetCheckIn.current.open()}>
                      Check-In
                    </Button>
                    <RBSheet
                      animationType={'slide'}
                      ref={refRBSheetCheckIn}
                      closeOnDragDown={true}
                      closeOnPressMask={false}
                      customStyles={{
                        draggableIcon: {
                          backgroundColor: theme['color-basic-300'],
                        },
                        container: {
                          height: 700,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          paddingLeft: 20,
                          paddingRight: 20,
                        },
                      }}>
                      {renderCheckIn()}
                    </RBSheet>
                  </View>
                ) : (
                  <View>
                    <Button
                      accessoryRight={props => (
                        <RenderIcon props={props} name="star" />
                      )}
                      style={{
                        width: 150,
                        marginRight: 10,
                      }}
                      onPress={() => {
                        setmodal({
                          visible: true,
                          text: 'Este botón se activará cuando te encuentres cerca del lugar, fecha y hora del evento',
                          title: 'Atención',
                          icon: { name: 'exclamation-circle' },
                        });
                      }}>
                      Check-In
                    </Button>
                  </View>
                )}
                <Button
                  onPress={() => openRBSheets()}
                  style={{
                    width: 150,
                    backgroundColor: '#000',
                    borderColor: '#000',
                  }}>
                  Mis Eventos
                </Button>
                <RBSheet
                  animationType={'slide'}
                  ref={refRBSheetMyEvents}
                  closeOnPressMask={false}
                  customStyles={{
                    wrapper: {
                      backgroundColor: 'transparent',
                    },
                    container: {
                      height: 670,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      paddingLeft: 20,
                      paddingRight: 20,
                      backgroundColor: '#000',
                    },
                  }}>
                  {renderMyEvents()}
                </RBSheet>
              </View>
            ) : (
              <></>
            )}

            {Search.load_event_details_success.description ? (
              <View style={{}}>
                <HTMLView
                  category="c1"
                  paragraphBreak={'\n'}
                  stylesheet={STYLES_HTML_TAGS}
                  value={
                    Search.load_event_details_success.description.length >
                      100 && !textShown
                      ? Search.load_event_details_success.description.substr(
                          0,
                          100,
                        ) + '...'
                      : Search.load_event_details_success.description
                  }
                />

                {Search.load_event_details_success.description.length > 100 ? (
                  <TouchableOpacity
                    onPress={() => readMore()}
                    style={styles.touch}>
                    <View style={styles.iconReadMore}>
                      <Text category="c1" style={{ marginRight: 10 }}>
                        {textShown ? 'Leer menos' : 'Leer más'}
                      </Text>

                      <Icon
                        name={textShown ? 'chevron-up' : 'chevron-down'}
                        pack="font-awesome-5"
                        style={styles.icons}
                      />
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
          </View>
          {search ? null : (
            <Carousel
              data={suggestion}
              title={'Recomendados para ti'}
              navigation={navigation}
              spinner={false}
              error={false}
            />
          )}
        </ScrollView>
      </Container>
    );
  };
  if (Object.keys(Search.load_event_details_success).length > 0) {
    return (
      <Container
        withBar={{ themeBar: 'light', colorBar: theme['color-primary-600'] }}
        withHeader={{
          backgroundColor: theme['color-primary-500'],
          title: name,
          align: 'center',
          accessoryLeft: {
            name: 'arrow-back',
            onPress: () => {
              deleteData();
              navigation.goBack();
            },
          },
        }}>
        <TabView
          style={{ flex: 1 }}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          <Tab appearance="basic" title="Información del evento">
            <EventDetailsAuxTab />
          </Tab>

          <Tab appearance="basic" title="Ver todas las fechas">
            <EventDatesAuxScreen
              data={Search.load_event_details_success}
              navigation={navigation}
            />
          </Tab>
        </TabView>
      </Container>
    );
  }
  return (
    <Container
      withBar={{ themeBar: 'light', colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-500'],
        title: name,
        align: 'center',
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => {
            deleteData();
            navigation.goBack();
          },
        },
      }}>
      <Loading
        visible={Search.show_event_details_spinner}
        barStyle="dark"
        statusText="info"
        backdropColor="transparent"
        colorSpinner={theme['color-info-500']}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  textEventInfoStyle: {
    fontSize: deviceWidth > 320 ? 14 : 12,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  icons: {
    width: 18,
    height: 18,
    marginRight: 3,
    color: '#3ABAEC',
  },
  iconText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  iconIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'flex-end',
  },
  iconSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: 20,
  },
  select: {
    marginLeft: 10,
    width: 250,
    backgroundColor: '#fff',
    marginTop: 5,
    fontSize: 10,
  },
  iconTicketText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 20,
  },
  iconReadMore: {
    marginTop: 35,
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  touch: {
    backgroundColor: 'transparent',
  },
});

export default EventDetailsAuxScreen;
