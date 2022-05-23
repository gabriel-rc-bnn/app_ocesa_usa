import React, { useEffect, useRef, useState } from 'react';
import * as FirebaseService from '../../firebase';
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  CalendarPicker,
  Container,
  Select,
  ChipItem,
  RangeSlider,
  Spinner,
  Mosaic,
} from '../../components';
import {
  Input,
  Text,
  useTheme,
  Button,
  Icon,
  Modal,
  Card,
} from '@ui-kitten/components';
import RBSheet from 'react-native-raw-bottom-sheet';
import { MosaicNames, States, UserCache, Functions } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../redux/actions';
import { getSearchData } from '../../services/connectApi/Events';
import _ from 'lodash';
import { eventName } from '../../firebase';

const { width } = Dimensions.get('window');
const { getKilometers } = Functions;

const SearchScreen = ({ navigation }) => {
  const theme = useTheme();
  const refRBSheet = useRef();

  const dispatch = useDispatch();
  const { Search } = useSelector(state => state);

  const [states, setStates] = useState({
    artist: '',
    venues: '',
    state: '',
    category: '',
    price: 20000,
    distance: 1200,
    valueDates: { desde: '', hasta: '' },
    activeChipTeatro: false,
    activeChipFamiliares: false,
    activeChipArte: false,
    activeChipConciertos: false,
    filter: false,
  });

  const [artist, setArtist] = useState('');
  const [venues, setVenues] = useState('');
  const [state, setState] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(20000);
  const [distance, setDistance] = useState(1200);
  const [valueDates, setValueDates] = useState({ desde: '', hasta: '' });
  const [position, setPosition] = useState({});
  const [venuesWithKm, setVenuesWithKm] = useState([]);
  const [activeChipTeatro, setActiveChipTeatro] = useState(false);
  const [activeChipFamiliares, setActiveChipFamiliares] = useState(false);
  const [activeChipArte, setActiveChipArte] = useState(false);
  const [activeChipConciertos, setActiveChipConciertos] = useState(false);
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    getPosition();
    dataExplorer();
  }, []);

  const getData = () => {
    dispatch(Actions.loadActiveArtists());
    // dispatch(Actions.loadStates());
    dispatch(Actions.loadVenues());
    dispatch(Actions.loadGenres());
    dispatch(Actions.loadVenuesExplorer());
  };

  const getPosition = async () => {
    const getDataPosition = await UserCache.getLocation();
    setPosition(getDataPosition);
  };

  const dataExplorer = () => {
    if (
      !Search.show_venues_explorer &&
      Search.load_venues_explorer_success instanceof Array &&
      Search.load_venues_explorer_success > 0 &&
      typeof position.latitud === 'number'
    ) {
      const venues = Search.load_venues_explorer_success.map(item => {
        const km = getKilometers(
          position.latitud,
          position.longitud,
          item.location.lat,
          item.location.lng,
        );
        return { name: item.name, km: Number(km) };
      });

      setVenuesWithKm({ venues });
    }
  };

  const filterOptions = async () => {
    setLoading(true);
    const categoryData = Search.load_genres_success.filter(
      item => item.name === category,
    );
    let distanceObject = [];
    if (distance < 1200) {
      distanceObject = Search.load_venues_explorer_success.filter(
        item => item.km > distance,
      );
    }

    const handleSearch = {
      activeFilterAdv: filter,
      activeChipTeatro: activeChipTeatro,
      activeChipFamiliares: activeChipFamiliares,
      activeChipArte: activeChipArte,
      activeChipConciertos: activeChipConciertos,
      state: state,
      category: categoryData.length > 0 ? categoryData[0].refId : '',
      artist: artist,
      venue: venues,
      valueDates: valueDates,
      price: price,
      distanceObject,
    };
    console.log("handleSearch",handleSearch);
    const data = await getSearchData(handleSearch);
    refRBSheet.current.close();
    reset();
    setLoading(false);
    return navigation.navigate('EventMosaic', {
      headerTitle: 'Filtros avanzados',
      MSIData: _.orderBy(data, ['dates'], ['asc']),
      home: true,
    });
  };

  const reset = () => {
    setArtist('');
    setVenues('');
    setState('');
    setCategory('');
    setPrice(20000);
    setDistance(1200);
    setValueDates({ desde: '', hasta: '' });
    setActiveChipTeatro(false);
    setActiveChipFamiliares(false);
    setActiveChipArte(false);
    setActiveChipConciertos(false);
    setFilter(false);
  };

  //Boton
  const renderItemsRBSheet = () => {
    return (
      <ScrollView>
        <Select
          title="Ubicación"
          data={States.map(item => item.name)}
          value={state}
          setValue={value => setState(value)}
        />
        <View style={{ marginVertical: 20 }}>
          <Text style={{ color: '#056DAE', fontWeight: 'bold' }}>Mostrar</Text>
          <View style={styles.containerChipItem}>
            <ChipItem
              label="Teatro"
              active={value => setActiveChipTeatro(value)}
            />
            <ChipItem
              label="Familiares"
              active={value => setActiveChipFamiliares(value)}
            />
            <ChipItem label="Arte" active={value => setActiveChipArte(value)} />
            <ChipItem
              label="Conciertos"
              active={value => setActiveChipConciertos(value)}
            />
          </View>
        </View>
        {activeChipConciertos ? (
          <Select
            title="Categoría"
            value={category}
            setValue={value => setCategory(value)}
            data={Search.load_genres_success.map(item => item.name).sort()}
          />
        ) : null}
        {filter ? (
          <View>
            <View style={{ marginTop: 20 }}>
              <RangeSlider
                label="Distancia"
                min={50}
                max={1200}
                step={50}
                textMarker={`${distance} — 1200 km`}
                initialValue={[distance]}
                setValue={value => setDistance(value[0])}
              />
            </View>
            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <CalendarPicker
                value={valueDates}
                setValue={value => {
                  const fecha = date => {
                    const dt = new Date(date);
                    return new Date(
                      dt.getFullYear(),
                      dt.getMonth(),
                      dt.getDate(),
                    );
                  };
                  setValueDates({
                    desde: value.desde !== '' ? fecha(value.desde) : '',
                    hasta: value.hasta !== '' ? fecha(value.hasta) : '',
                  });
                  FirebaseService.logEvent(eventName.searchByDate, {
                    desde: value.desde !== '' ? fecha(value.desde) : '',
                    hasta: value.hasta !== '' ? fecha(value.hasta) : '',
                  });
                }}
              />
            </View>
            <RangeSlider
              label="Precio"
              min={250}
              max={20000}
              step={250}
              textMarker={`$${price
                .toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} — $20,000`}
              initialValue={[price]}
              setValue={value => setPrice(value[0])}
            />
            <View style={{ marginVertical: 20 }}>
              <Select
                title="Artista"
                data={Search.load_artists_active_success.map(item => item.name)}
                value={artist}
                setValue={value => setArtist(value)}
              />
            </View>
            <View style={{ marginVertical: 20 }}>
              <Select
                title="Inmuebles"
                data={Search.load_top_hits_success.map(item => item.name)}
                value={venues}
                setValue={
                  (value => setVenues(value),
                  FirebaseService.logEvent(eventName.searchByVenue, {
                    venues: venues,
                  }))
                }
              />
            </View>
          </View>
        ) : null}

        <TouchableOpacity
          style={[styles.view, { justifyContent: 'center' }]}
          onPress={() => setFilter(!filter)}>
          <Text style={{ marginTop: 30, marginBottom: 30 }}>
            Filtro avanzado
          </Text>
          <Icon name="filter" pack="font-awesome-5" style={styles.icon} />
        </TouchableOpacity>
        <View
          style={[styles.view, { justifyContent: 'center', marginBottom: 20 }]}>
          <Button style={{ width: 200 }} onPress={() => filterOptions()}>
            Aplicar
          </Button>
        </View>
      </ScrollView>
    );
  };

  const SearchInput = () => {
    return (
      <>
        <Input
          status="control"
          textAlign="center"
          placeholder="Búsqueda"
          style={{ marginHorizontal: 7 }}
          onPressIn={() => refRBSheet.current.open()}
        />
      </>
    );
  };

  return (
    <Container
      withBar={{ themeBar: 'light', colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-500'],
        align: 'center',
        title: SearchInput,
      }}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        onClose={() => reset()}
        customStyles={{
          draggableIcon: {
            backgroundColor: theme['color-primary-300'],
          },
          container: {
            height: 550,
            borderRadius: 20,
            paddingLeft: 20,
            paddingRight: 10,
          },
        }}>
        {renderItemsRBSheet()}
      </RBSheet>
      <Mosaic navigation={navigation} data={MosaicNames} />
      <Modal
        visible={loading}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Card disabled={true}>
          <Spinner visible={loading} />
          <Text style={{ marginTop: 10, marginBottom: 20, fontWeight: 'bold' }}>
            Cargando contenido, por favor espera...
          </Text>
        </Card>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  icon: {
    color: '#E74C3D',
    fontSize: 20,
    marginLeft: 10,
  },
  containerChipItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    marginVertical: 15,
    overflow: 'hidden',
    borderRadius: 50,
  },
});

export default SearchScreen;
