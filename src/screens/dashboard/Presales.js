import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  CardNoEventsView,
  Carousel,
  Container,
  Spinner,
} from '../../components';
import { Card, Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import { Banners } from '../../assets/img';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../redux/actions';

const PresalesScreen = ({ navigation }) => {
  const theme = useTheme();
  const ventasAnticipadas = false;
  const dispatch = useDispatch();
  const { Search } = useSelector(state => state);

  useEffect(() => {
    dispatch(Actions.loadPresalesCurrentUpcoming());
  }, []);

  const renderCarousel = () => {
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
        <Carousel
          data={Search.load_presales_mosaic_success.currentPresales}
          title="Preventas"
          spinner={Search.show_presales_mosaic_spinner}
          navigation={navigation}
          date
        />
      );
    }
    return (
      <View style={{ marginTop: 10 }}>
        <CardNoEventsView message={'con Preventas vigentes'} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderCarousel()}
      <Text style={[styles.title, { marginTop: 30 }]} status="primary">
        Otras ventas anticipadas
      </Text>
      {ventasAnticipadas ? (
        <Text style={{ marginTop: 15 }}>Carrusel</Text>
      ) : (
        <Card
          style={{
            flex: 0,
            marginTop: 15,
            alignSelf: 'center',
            marginLeft: 5,
            marginRight: 5,
          }}>
          <Icon
            name="calendar-week"
            pack="font-awesome-5"
            style={{
              fontSize: 25,
              alignSelf: 'center',
              color: theme['color-info-500'],
            }}
          />
          <Text
            category="c1"
            style={{
              marginTop: 5,
              textAlign: 'center',
              color: theme['color-basic-600'],
            }}>
            No hay eventos con Otras ventas anticipadas en este momento
          </Text>
        </Card>
      )}

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default PresalesScreen;
