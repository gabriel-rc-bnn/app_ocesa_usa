import { Icon, Modal, Text, useTheme } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MosaicNames, UserCache } from '../../utils';
import * as Actions from '../../redux/actions';
import {
  getByCategory,
  getByCategoryAndGenre,
  getCategoriesAndGenres,
} from '../../services/connectApi/Events';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CardNoEventsView,
  Container,
  Mosaic,
  Spinner,
  SelectButton,
} from '../../components';
import { Col, Row } from 'react-native-easy-grid';
import _ from 'lodash';
import * as FirebaseService from '../../firebase';

const EventMosaicScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const defaultCategoryId = 'concierto';
  const DEFAULT_ALL_GENRES = { refId: 'all', name: 'Todos los géneros' };
  const { headerTitle, MSIData, home, artist } = route.params;
  const dispatch = useDispatch();
  const { Search } = useSelector(state => state);
  const [position, setPosition] = useState();
  const [spinnerCategoriesGenres, setSpinnerCategoriesGenres] = useState(false);
  const [categoriesGenres, setCategoriesGenres] = useState(null);
  const [eventsCategoryGenres, setEventsCategoryGenres] = useState(null);
  const [indexCategorySelected, setIndexCategorySelected] = useState(0);
  const [MSIDataState, setMSIDataState] = useState();
  const [isModalCategories, setIsModalCategories] = useState(false);
  const [isModalGenres, setIsModalGenres] = useState(false);
  const [categoriesLabel, setCategoriesLabel] = useState('Concierto');
  const [genresLabel, setGenresLabel] = useState(DEFAULT_ALL_GENRES.name);
  const [useCategories, setUseCategories] = useState(false);

  useEffect(() => {
    getPosition();
    getData();
  }, []);

  const getPosition = async () => {
    const getDataPosition = await UserCache.getLocation();
    setPosition(getDataPosition);
  };

  const getData = () => {
    switch (headerTitle) {
      case MosaicNames[0].name:
        dispatch(Actions.loadEventsPosition(position));
        break;
      case MosaicNames[1].name:
        dispatch(Actions.loadRecently());
        break;
      case MosaicNames[2].name:
        dispatch(Actions.loadTrendings());
        break;
      case MosaicNames[3].name:
        dispatch(Actions.loadRecommendationsMosaic(position));
        break;
      case MosaicNames[5].name:
        dispatch(Actions.loadVenues());
        break;
      case MosaicNames[7].name:
        dispatch(Actions.loadFamilyEvents());
        break;
      case MosaicNames[8].name:
        loadCategoriesAndGenres();
        break;
      case MosaicNames[9].name:
        setMSIDataState(MSIData);
        break;
      default: {
        if (home) {
          setMSIDataState(MSIData);
        }
        break;
      }
    }
  };

  const loadCategoriesAndGenres = async () => {
    try {
      setUseCategories(true);
      const dataGetByCategory = await getByCategory(defaultCategoryId);
      const dataCategoriesAndGenres = await getCategoriesAndGenres();
      setEventsCategoryGenres(dataGetByCategory);
      if (
        Array.isArray(dataCategoriesAndGenres) &&
        dataCategoriesAndGenres.length > 0 &&
        dataGetByCategory
      ) {
        for (let i = 0; i < dataCategoriesAndGenres.length; i++)
          dataCategoriesAndGenres[i].qualifierIds = [
            DEFAULT_ALL_GENRES,
            ...dataCategoriesAndGenres[i].qualifierIds,
          ];
        setIndexCategorySelected(
          dataCategoriesAndGenres.findIndex(
            item => item.refId === defaultCategoryId,
          ),
        );

        setCategoriesGenres(dataCategoriesAndGenres);
      }
    } catch (error) {
      console.error('Error loadCategoriesAndGenres:', error);
      predeterminedValues();
    }
  };

  const predeterminedValues = () => {
    setSpinnerCategoriesGenres(false);
    setCategoriesGenres(null);
    setEventsCategoryGenres(null);
    setIndexCategorySelected(0);
    setUseCategories(false);
  };

  const renderEvents = () => {
    switch (headerTitle) {
      case MosaicNames[0].name:
        return renderMosaicData(
          Search.show_events_position_spinner,
          Search.load_events_position_success,
          Search.load_events_position_fail.error,
          'events',
          MosaicNames[0].name,
        );
      case MosaicNames[1].name:
        return renderMosaicData(
          Search.show_recently_spinner,
          Search.load_recently_success,
          Search.load_recently_fail.error,
          'events',
          `de ${MosaicNames[1].name}`,
        );
      case MosaicNames[2].name:
        return renderMosaicData(
          Search.show_trendings_spinner,
          Search.load_trendings_success,
          Search.load_trendings_fail.error,
          'events',
          `en ${MosaicNames[2].name}`,
        );
      case MosaicNames[3].name:
        return renderMosaicData(
          Search.show_recommendations_mosaic_spinner,
          Search.load_recommendations_mosaic_success,
          Search.load_recommendations_mosaic_fail.error,
          'events',
          `de ${MosaicNames[3].name}`,
        );
      case MosaicNames[5].name:
        return renderMosaicData(
          Search.show_venues_spinner,
          Search.load_venues_success,
          Search.load_venues_fail.error,
          'venues',
          `en ${MosaicNames[5].name}`,
        );
      case MosaicNames[7].name:
        return renderMosaicData(
          Search.show_family_events_spinner,
          Search.load_family_events_success,
          Search.load_family_events_fail.error,
          'events',
          MosaicNames[7].name,
        );
      case MosaicNames[8].name:
        return renderCategories();
      case MosaicNames[9].name:
        return renderMSI();
      default: {
        if (home) {
          return renderMSI();
        } else {
          return renderMosaicData(
            Search.show_artist_spinner,
            Search.load_artists_success,
            Search.load_artists_fail.error,
            'events',
            'del artista seleccionado',
          );
        }
      }
    }
  };

  const renderMosaicData = (spinner, data, error, type, name) => {
    if (spinner) {
      return (
        <View style={styles.container}>
          <Spinner visible={spinner} />
          <Text style={{ marginTop: 30, fontSize: 16, color: '#686868' }}>
            Cargando contenido, por favor espera...
          </Text>
        </View>
      );
    }
    if (data instanceof Array && data.length > 0 && !error) {
      return <Mosaic data={data} navigation={navigation} typeCard={type} />;
    }
    return (
      <View style={{ marginTop: 10 }}>
        <CardNoEventsView message={name} />
      </View>
    );
  };

  const renderCategories = () => {
    return (
      <React.Fragment>
        {renderCategoriesFilters()}
        {renderMosaicData(
          spinnerCategoriesGenres,
          eventsCategoryGenres,
          false,
          'events',
          'con alguna Categoría',
        )}
      </React.Fragment>
    );
  };

  const renderCategoriesFilters = () => {
    if (Array.isArray(categoriesGenres) && categoriesGenres.length > 0) {
      const disableGenres =
        Array.isArray(categoriesGenres[indexCategorySelected].qualifierIds) &&
        categoriesGenres[indexCategorySelected].qualifierIds.length < 2;

      return (
        <Row style={{ backgroundColor: '#f4f4f4', height: 40 }}>
          <Col>
            <SelectButton
              containerTextPropsStyle={{ justifyContent: 'center' }}
              onPress={() => setIsModalCategories(true)}>
              {categoriesLabel}
            </SelectButton>
          </Col>

          <Col
            style={{ paddingRight: 10, opacity: disableGenres ? 0.5 : 1.0 }}
            pointerEvents={disableGenres ? 'none' : 'auto'}>
            <SelectButton
              disableIcon={disableGenres}
              containerTextPropsStyle={{ justifyContent: 'center' }}
              onPress={() => setIsModalGenres(true)}>
              {genresLabel}
            </SelectButton>
          </Col>
        </Row>
      );
    }
    return null;
  };

  const renderMSI = () => {
    if (Array.isArray(MSIDataState) && MSIDataState.length > 0) {
      const dataFilter = _.orderBy(MSIDataState, ['dates'], ['asc']);

      return (
        <Mosaic data={dataFilter} navigation={navigation} typeCard="events" />
      );
    }

    if (home) {
      return (
        <View style={{ marginTop: 10 }}>
          <CardNoEventsView message={`de ${headerTitle}`} />
        </View>
      );
    }

    return (
      <View style={{ marginTop: 10 }}>
        <CardNoEventsView message={`de ${MosaicNames[9].name}`} />
      </View>
    );
  };

  const renderModalCategories = () => {
    return (
      <Modal
        visible={isModalCategories}
        onBackdropPress={() => setIsModalCategories(false)}
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            minHeight: 230,
            maxHeight: 450,
            width: 280,
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
                Categorías
              </Text>
            </Col>

            <Col size={15} style={{ backgroundColor: 'transparent' }}>
              <TouchableOpacity
                onPress={() => setIsModalCategories(false)}
                style={{ backgroundColor: 'transparent', padding: 10 }}>
                <Icon
                  pack="font-awesome-5"
                  name="times"
                  style={{ fontSize: 20, color: '#686868' }}
                />
              </TouchableOpacity>
            </Col>
          </Row>

          <FlatList
            renderItem={renderListCategories}
            data={categoriesGenres}
            removeClippedSubviews={false}
            disableVirtualization
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      </Modal>
    );
  };

  const renderListCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'transparent',
          paddingHorizontal: 10,
          paddingVertical: 15,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        onPress={() => loadCategoryOrGenre(null, item, index)}>
        <Text style={styles.textStyle} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const loadCategoryOrGenre = async (
    genre = null,
    category = null,
    indexCategory = null,
  ) => {
    if (category) {
      FirebaseService.logEvent(FirebaseService.eventName.searchByCategory, {
        categoria: category.name,
      });
      setIsModalCategories(false);
      setCategoriesLabel(category.name);
      setGenresLabel(DEFAULT_ALL_GENRES.name);
      setIndexCategorySelected(indexCategory);
    } else {
      FirebaseService.logEvent(FirebaseService.eventName.searchByGenre, {
        genero: genre.name,
        categoria: categoriesGenres[indexCategorySelected].name,
      });
      setIsModalGenres(false);
      setGenresLabel(genre.name);
    }
    setSpinnerCategoriesGenres(true);
    setEventsCategoryGenres(null);
    if (category || (genre && genre.refId == 'all')) {
      const dataByCategory = await getByCategory(
        categoriesGenres[category ? indexCategory : indexCategorySelected]
          .refId,
      );
      setSpinnerCategoriesGenres(false);
      setEventsCategoryGenres(dataByCategory);
    } else {
      const dataByCategoryAndGenre = await getByCategoryAndGenre(
        categoriesGenres[indexCategorySelected].refId,
        genre.refId,
      );
      setSpinnerCategoriesGenres(false);
      setEventsCategoryGenres(dataByCategoryAndGenre);
    }
  };

  const renderModalGenres = () => {
    return (
      <Modal
        visible={isModalGenres}
        onBackdropPress={() => setIsModalGenres(false)}
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            minHeight: 200,
            maxHeight: 450,
            width: 280,
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
                Géneros
              </Text>
            </Col>

            <Col size={15} style={{ backgroundColor: 'transparent' }}>
              <TouchableOpacity
                onPress={() => setIsModalGenres(false)}
                style={{ backgroundColor: 'transparent', padding: 10 }}>
                <Icon
                  pack="font-awesome-5"
                  name="times"
                  style={{ fontSize: 20, color: '#686868' }}
                />
              </TouchableOpacity>
            </Col>
          </Row>

          {Array.isArray(categoriesGenres) &&
            categoriesGenres.length > 0 &&
            indexCategorySelected > -1 && (
              <FlatList
                renderItem={renderListGenres}
                data={categoriesGenres[indexCategorySelected].qualifierIds}
                removeClippedSubviews={false}
                disableVirtualization
                keyExtractor={(item, index) => String(index)}
              />
            )}
        </View>
      </Modal>
    );
  };

  const renderListGenres = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'transparent',
          paddingHorizontal: 10,
          paddingVertical: 15,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
        onPress={() => loadCategoryOrGenre(item, null, null)}>
        <Text style={styles.textStyle} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const clearData = () => {
    if (artist) {
      dispatch(Actions.clearArtist());
    }
    if (useCategories) {
      predeterminedValues();
    }
    navigation.goBack();
  };

  return (
    <Container
      withBar={{ themeBar: 'light', colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-500'],
        align: 'center',
        title: headerTitle,
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => clearData(),
        },
      }}>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
          {renderEvents()}
          {renderModalCategories()}
          {renderModalGenres()}
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#686868',
    fontSize: 14,
  },
});

export default EventMosaicScreen;
