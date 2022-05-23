import { Text, useTheme } from '@ui-kitten/components';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CardNoEventsView, Container, Mosaic, Spinner } from '../../components';
import * as Actions from '../../redux/actions';

const LocationScreen = ({ route, navigation }) => {
  const { _source, headerTitle } = route.params;
  const dispatch = useDispatch();
  const { Search } = useSelector(state => state);
  const theme = useTheme();

  useEffect(() => {
    if (_source.ref_id === 'citibanamexconecta') {
      dispatch(Actions.loadDriveInAllEvents());
    } else {
      dispatch(Actions.searchLocation(_source.ref_id));
    }
  }, []);

  const renderVenuesResults = () => {
    if (
      _source.ref_id === 'citibanamexconecta'
        ? Search.show_drivein_all_events_spinner
        : Search.show_search_location_spinner
    ) {
      return (
        <View style={styles.spinnerCarouselStyle}>
          <Spinner
            visible={
              _source.ref_id === 'citibanamexconecta'
                ? Search.show_drivein_all_events_spinner
                : Search.show_search_location_spinner
            }
          />
          <Text style={[styles.textStyle, { marginTop: 30, fontSize: 16 }]}>
            Cargando contenido, por favor espera...
          </Text>
        </View>
      );
    }

    if (_source.ref_id !== 'citibanamexconecta') {
      if (
        Search.load_search_location_success instanceof Array &&
        Search.load_search_location_success.length > 0 &&
        !Search.load_search_location_fail.error
      ) {
        return (
          <Mosaic
            data={Search.load_search_location_success}
            navigation={navigation}
            typeCard="events"
          />
        );
      }
    } else {
      if (
        Search.load_drivein_all_events_success instanceof Array &&
        Search.load_drivein_all_events_success.length > 0 &&
        !Search.load_drivein_all_events_fail.error
      ) {
        const dataFilter = _.orderBy(
          Search.load_drivein_all_events_success,
          ['dates'],
          ['asc'],
        );
        return (
          <Mosaic data={dataFilter} navigation={navigation} typeCard="events" />
        );
      }
    }

    return (
      <View style={{ marginTop: 10 }}>
        <CardNoEventsView message={`en ${_source.name}`} />
      </View>
    );
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
          onPress: () => navigation.goBack(),
        },
      }}>
      <View style={{ flex: 1, backgroundColor: '#fcfcfc' }}>
        {renderVenuesResults()}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: '#686868',
    fontSize: 14,
  },
  spinnerCarouselStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LocationScreen;
