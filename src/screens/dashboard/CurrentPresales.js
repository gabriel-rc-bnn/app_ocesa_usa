import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CardNoEventsView, Container, Mosaic, Spinner } from '../../components';
import { Text, useTheme, TabView, Tab } from '@ui-kitten/components';
import { NextPresalesScreen } from '.';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../redux/actions';

const CurrentPresalesScreen = ({ navigation, route }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { headerTitle } = route.params;
  const theme = useTheme();
  const dispatch = useDispatch();
  const { Search } = useSelector(state => state);

  //No carga la informacion
  useEffect(() => {
    dispatch(Actions.loadPresalesCurrentUpcoming());
  }, []);

  const renderData = () => {
    if (Search.show_presales_mosaic_spinner) {
      return (
        <View style={styles.container}>
          <Spinner visible={Search.show_presales_mosaic_spinner} />
          <Text style={{ marginTop: 30, fontSize: 16, color: '#686868' }}>
            Cargando contenido, por favor espera...
          </Text>
        </View>
      );
    }
    if (
      Search.load_presales_mosaic_success.currentPresales instanceof Array &&
      Search.load_presales_mosaic_success.currentPresales.length > 0 &&
      !Search.load_presales_mosaic_fail.error
    ) {
      return (
        <Mosaic
          data={Search.load_presales_mosaic_success.currentPresales}
          navigation={navigation}
          typeCard="events"
          presales
        />
      );
    }
    return (
      <View style={{ marginTop: 10 }}>
        <CardNoEventsView message={'con Preventas vigentes'} />
      </View>
    );
  };

  const CurrentPresalesTab = () => {
    return renderData();
  };

  return (
    <Container
      withBar={{ themeBar: 'light', colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-500'],
        title: headerTitle,
        align: 'center',
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => navigation.goBack(),
        },
      }}>
      <TabView
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Tab appearance="basic" title="Vigentes">
          <CurrentPresalesTab />
        </Tab>
        <Tab appearance="basic" title="Próximas preventas">
          <NextPresalesScreen
            data={{
              data: Search.load_presales_mosaic_success.upcomingPresales,
              spinner: Search.show_presales_mosaic_spinner,
              error: Search.load_presales_mosaic_fail.error,
            }}
            navigation={navigation}
          />
        </Tab>
      </TabView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CurrentPresalesScreen;
