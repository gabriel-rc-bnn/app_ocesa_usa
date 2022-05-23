import { Icon, Modal, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import * as FirebaseService from '../firebase';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  PixelRatio,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import shortid from 'shortid';
import {
  formatDate,
  getClosestIndexDate,
  getEventsByRegion,
  getFamilyCategory,
  getStateShortName,
  isCurrentOrFutureDate,
  setOptimizedImages,
} from '../utils/config/Functions';
import { Col, Row } from 'react-native-easy-grid';
import { defaulVerticalImage } from '../utils/config/Constants';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../redux/actions';
import {
  CarouselLocationItem,
  CarouselSearchItem,
  Spinner,
  TastesButton,
} from '.';
import Toast from 'react-native-root-toast';
import { RootSiblingParent } from 'react-native-root-siblings';
import filter from 'lodash/filter';
import orderBy from 'lodash/orderBy';
import { UserCache } from '../utils';

const { width, height } = Dimensions.get('window');

const MosaicComponent = ({
  navigation,
  data,
  typeCard,
  search,
  groupDates,
  presales,
  isUpcomingPresales,
}) => {
  const [token, setToken] = useState(false);
  const dispatch = useDispatch();
  const { Search } = useSelector(state => state);
  const [isModalArtist, setIsModalArtist] = useState(false);

  useEffect(() => {
    async function artistData() {
      if (!Search.show_artist_spinner) {
        if (Search.load_artists_success.length > 0) {
          if (Search.load_artists_success.length == 1) {
            Search.load_artists_success[0].dateTarget = null;
            return getInfo(Search.load_artists_success[0], true);
          } else if (Search.load_artists_success.length > 1) {
            return navigation.navigate('EventMosaic', {
              headerTitle: Search.load_artists_success[0].name,
              artist: true,
            });
          } else {
            Toast.show(
              'No se encontró el artista seleccionado en este momento',
              {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
              },
            );
          }
        }
      }
    }
    artistData();
    validateToken();
  }, [Search.show_artist_spinner]);

  // console.log(Search.load_top_hits_success);

  const validateToken = async () => {
    if ((await UserCache.getToken()) != null) {
      setToken(true);
    } else {
      setToken(false);
    }
  };

  const renderItem = (item, index) => {
    if (!token && item.name == 'Recomendados para ti') {
      return null;
    }
    if (item.name == '3, 6, 9 MSI Citibanamex') {
      return null;
    }
    return (
      <View style={{ marginVertical: 5 }} key={index}>
        <TouchableOpacity
          onPress={() => renderNavigation(item.title, item.name)}>
          <View style={[styles.viewStyle, item.mosaicStyle]}>
            <View style={styles.titleContainerStyle}>
              <Icon
                name={item.iconName}
                pack="font-awesome-5"
                style={styles.appMosaicIconStyle}
              />
              <Text style={styles.titleStyle}>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderNavigation = (title, name) => {
    if (title == 'artists' || title == 'presales') {
      if (title == 'artists') {
        dispatch(Actions.loadActiveArtists());
        setIsModalArtist(true);
      } else {
        return navigation.navigate('CurrentPresales', { headerTitle: name });
      }
    } else {
      return navigation.navigate('EventMosaic', { headerTitle: name });
    }
  };

  const renderModalArtist = () => {
    return (
      <Modal
        visible={isModalArtist}
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View
          style={{
            minHeight: 200,
            maxHeight: height - 85,
            minWidth: 260,
            maxWidth: width - 40,
            backgroundColor: 'white',
            borderRadius: 5,
          }}>
          <Row
            style={{
              height: 45,
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#e2e2e2',
            }}>
            <Col size={85} style={{ backgroundColor: 'transparent' }}>
              <Text
                style={{
                  color: '#00bdf2',
                  fontSize: 14,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  paddingHorizontal: 15,
                  marginLeft: 50,
                }}>
                Artista
              </Text>
            </Col>

            <Col size={15} style={{ backgroundColor: 'transparent' }}>
              <TouchableOpacity
                onPress={() => setIsModalArtist(false)}
                style={{ backgroundColor: 'transparent', padding: 10 }}>
                <Icon
                  pack="font-awesome-5"
                  name="times"
                  style={{ fontSize: 20, color: '#686868' }}
                />
              </TouchableOpacity>
            </Col>
          </Row>

          {renderArtistList()}
        </View>
      </Modal>
    );
  };

  const renderArtistList = () => {
    if (Search.show_active_artists_spinner) {
      return (
        <View style={styles.container}>
          <Spinner visible={Search.show_active_artists_spinner} />
          <Text
            style={{
              marginTop: 30,
              fontSize: 12,
              color: '#686868',
              textAlign: 'center',
            }}>
            Cargando contenido, por favor espera...
          </Text>
        </View>
      );
    }

    if (
      Search.load_artists_active_success instanceof Array &&
      Search.load_artists_active_success.length > 0 &&
      !Search.load_artists_active_fail.error
    ) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}>
          {renderArtistsMatrix(Search.load_artists_active_success)}
        </ScrollView>
      );
    }

    return (
      <View style={styles.container}>
        <Text
          style={{
            color: '#686868',
            fontSize: 12,
            paddingHorizontal: 15,
            textAlign: 'center',
          }}>
          No hay artistas en este momento
        </Text>
      </View>
    );
  };

  const renderArtistsMatrix = activeArtistsData => {
    return activeArtistsData.map(artist => (
      <TastesButton
        onPress={() => selectArtist(artist)}
        key={shortid.generate()}
        color1="#e0e0e0"
        color2="#e0e0e0"
        buttonPropsStyle={{ minWidth: 90 }}
        textPropsButtonStyle={{
          color: 'black',
          fontSize: 15,
        }}>
        {artist.name}
      </TastesButton>
    ));
  };

  const selectArtist = artist => {
    dispatch(Actions.loadArtist(artist.id));
    setIsModalArtist(false);
  };

  const getInfo = (info, unique = false) => {
    if (unique) {
      return navigation.navigate('EventDetailsAux', {
        url: info.details_url,
        name: info.name,
        search: true,
      });
    }
    return navigation.navigate('EventDetailsAux', {
      url: info.details_url,
      name: info.name,
      deleteInfo: true,
      search: true,
    });
  };

  const renderMosaicEvent = () => {
    if (
      search &&
      Array.isArray(data) &&
      data.length > 0 &&
      isObject(data.userSearch) &&
      data.userSearch.city
    ) {
      const groupEventsByRegion = getEventsByRegion(data);
      const eventsInYourCity = groupEventsByRegion.eventsScore.find(
        score => score === 5,
      );

      return (
        <ScrollView>
          {!eventsInYourCity && (
            <Text
              style={{
                color: '#686868',
                fontSize: 14,
                textAlign: 'center',
                paddingTop: 10,
                paddingBottom: 15,
                paddingHorizontal: 40,
              }}>
              No hay eventos disponibles en tu estado, revisa a continuación los
              cercanos a tu región
            </Text>
          )}
          {renderEventsByRegion(groupEventsByRegion.eventsByRegion)}
        </ScrollView>
      );
    }

    if (data instanceof Array && data.length > 0) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingVertical: 5,
          }}>
          {renderEventItem(data, data.length)}
        </ScrollView>
      );
    }

    return null;
  };

  const renderEventsByRegion = eventsByRegion => {
    return eventsByRegion.map(event => {
      let title = null;

      if (event.eventScore === 3) title = 'Eventos cercanos a tu región';
      if (event.eventScore === 0) title = 'Eventos en otros estados';

      return (
        <View key={shortid.generate()}>
          {title && (
            <Row>
              <Col size={10}>
                <Text
                  style={{
                    marginTop: 20,
                    marginBottom: 10,
                    paddingLeft: 10,
                    fontSize: 18,
                    color: '#056DAE',
                  }}>
                  {title}
                </Text>
              </Col>
            </Row>
          )}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              paddingVertical: 5,
            }}>
            {renderEventItem(event.events, event.events.length)}
          </View>
        </View>
      );
    });
  };

  const renderEventItem = (data, dataLength) => {
    const newData = data.slice(0);
    const startDateUserSearch = false; // no se encontró en los archivos de redux

    if (dataLength % 2 === 1)
      newData.push({
        dates: [],
        name: '',
        venue: '',
        s_img_url: '',
        deals: [],
      });

    return newData.map(item => {
      const datesAux = [];
      const venueArray = [];
      const stateRefArray = [];
      let closestDateIndex;
      let hasMultipleDates = false;

      if (!presales) {
        for (let i = 0; i < item.dates.length; i++) {
          if (
            typeof item.dates[i] === 'object' &&
            typeof item.dates[i] !== 'undefined' &&
            item.dates[i] !== null
          ) {
            if (item.dates[i].date) {
              datesAux.push(item.dates[i].date);
              if (item.dates[i].venue)
                venueArray.push(item.dates[i].venue.name);
              if (item.dates[i].stateRef)
                stateRefArray.push(item.dates[i].stateRef);
            }
          } else datesAux.push(item.dates[i]);
        }

        if (!item.s_img_url)
          item.s_img_url =
            item.dates && item.dates.length > 0 && item.dates[0].squaredImageUrl
              ? item.dates[0].squaredImageUrl
              : item.squaredImageUrl;

        item.dates = filter(datesAux, date =>
          isCurrentOrFutureDate(date, true),
        );

        if (startDateUserSearch) {
          closestDateIndex = getClosestIndexDate(
            item.dates,
            startDateUserSearch,
          );
          item.dates = [item.dates[closestDateIndex]];
        } else closestDateIndex = getClosestIndexDate(item.dates);
      } else item.dates = [item.date];

      if (groupDates && Array.isArray(item.dates) && item.dates.length > 1)
        hasMultipleDates = true;

      const _source = item;
      _source.dateTarget = _source.dates;
      const { name, venue, s_img_url } = _source;
      const isFamily = getFamilyCategory(_source);
      const stateRef = item.stateRef || stateRefArray[closestDateIndex];
      const stateShortName = getStateShortName(stateRef);
      let displayDate;

      if (isFamily || hasMultipleDates) displayDate = null;
      else {
        if (presales || startDateUserSearch)
          displayDate = formatDate(item.dates[0]);
        else displayDate = formatDate(item.dates[closestDateIndex]);
      }

      return (
        <View key={shortid.generate()} style={{ marginVertical: 5 }}>
          <CarouselSearchItem
            isUpcomingPresales={!!isUpcomingPresales}
            deals={isUpcomingPresales ? item.deals[0] : null}
            urlBuyTickets={
              isUpcomingPresales
                ? item.tickerSalesUrl || item.ticketMasterUrl
                : null
            }
            name={name}
            venue={venue || venueArray[closestDateIndex]}
            stateShortName={stateShortName}
            stateName={isUpcomingPresales ? item.state : null}
            date={displayDate}
            onPress={() => getInfo(_source)}
            image={setOptimizedImages(s_img_url) || defaulVerticalImage}
          />
        </View>
      );
    });
  };

  const renderMosaicVenues = () => {
    console.log("renderMosaicVenues",data);
    console.log("renderMosaicVenuesorderBy",orderBy(data, 'order'));
      let newData = data.map(el => {

        if(el.name==='Auditorio Citibanamex'){
          return {...el, order:1}
        }

        if(el.name==='Foro Sol'){
          return {...el, order:2}
        }

        if(el.name==='Autódromo Hermanos. Rodríguez.'){
          return {...el, order:3}
        }
      
        return el

      })
    newData = newData.filter((item) => item.name !== 'Citibanamex Conecta');
    newData = newData.filter((item) => item.name !== 'El Plaza Condesa');
    
    

    if (newData instanceof Array && newData.length > 0) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingVertical: 5,
          }}>
          {renderVenueItem(orderBy(newData, 'order'))}
        </ScrollView>
      );
    }

    return null;
  };

  const renderVenueItem = data => {
    return data.map(item => {
      const _source = item;
      _source.img_url = item.img_url_rectangle;
      _source.dateTarget = _source.dates;

      return (
        <View
          key={shortid.generate()}
          style={{ marginVertical: 5, marginHorizontal: 5 }}>
          <CarouselLocationItem
            name={item.name}
            city={item.city}
            img_url={item.img_url_square}
            onPress={() => {
              FirebaseService.logEvent(
                FirebaseService.eventName.searchByState,
                {
                  name: item.name,
                  city: item.city,
                },
              );
              navigation.navigate('Location', {
                _source,
                headerTitle: item.name,
              });
            }}
          />
        </View>
      );
    });
  };

  const renderView = () => {
    switch (typeCard) {
      case 'events':
        return renderMosaicEvent();
      case 'venues':
        return renderMosaicVenues();
      default:
        return (
          <RootSiblingParent>
            <View style={{ flex: 1 }}>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  paddingVertical: 5,
                }}>
                {data.map((item, index) => renderItem(item, index))}
              </ScrollView>
              {renderModalArtist()}
            </View>
          </RootSiblingParent>
        );
    }
  };

  return renderView();
};

const styles = StyleSheet.create({
  viewStyle: {
    marginVertical: 5,
    marginHorizontal: 10,
    width: 140,
    height: 140,
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    borderRadius: 2,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
  },
  titleStyle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    paddingLeft: 5,
    paddingRight: 5,
  },
  titleContainerStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appMosaicIconStyle: {
    color: 'white',
    marginBottom: 10,
    fontSize: 30,
  },
  viewUpcomingPresalesStyle: {
    marginRight: 5,
    marginLeft: 5,
    width: Platform.OS === 'ios' ? 400 / 2.8 + 1 : 400 / 2.8 + 1 - 1,
    height: Platform.OS === 'ios' ? 252 + 10 : 252 + 15,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MosaicComponent;
