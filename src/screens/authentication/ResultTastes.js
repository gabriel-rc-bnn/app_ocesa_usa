import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import {
  clearMessagesLogin,
  clearMessagesTastes,
  saveMusicGenreProfiler,
} from '../../redux/actions';
import { Iconos } from '../../assets/img';
import * as FirebaseService from '../../firebase';
import { Container, ModalCard } from '../../components';
import { Colors, Constants, Styles } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { Loading, TastesChart } from '../../components';
import { Accessory, Avatar } from 'react-native-elements';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme, Text, Button } from '@ui-kitten/components';
import { resetNavigation } from '../../utils/config/Functions';

const ResultTastesScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    visible: false,
    text: undefined,
    title: undefined,
    icon: undefined,
  });

  const {
    load_save_music_genre_profiler_success,
    show_save_music_genre_profiler_spinner,
    load_save_music_genre_profiler_fail,
  } = useSelector(state => state.Tastes);

  useEffect(() => {
    if (Object.keys(load_save_music_genre_profiler_success).length > 0) {
      FirebaseService.logEvent(FirebaseService.eventName.syncProfileMusic);

      dispatch(clearMessagesTastes());
      dispatch(clearMessagesLogin());

      resetNavigation('Dashboard', navigation);
    } else if (load_save_music_genre_profiler_fail.error) {
      setModal({
        visible: true,
        icon: 'exclamation-circle',
        title: '¡Error!',
        text: Constants.MESSAGES.errorPlatform,
      });
    }
  }, [show_save_music_genre_profiler_spinner]);

  const saveResultTastes = (genre, percentage) => {
    const musicGenres = genre.map((item, index) => {
      return {
        genre: item,
        percentage: (percentage[index] * 100).toFixed(2),
      };
    });

    dispatch(saveMusicGenreProfiler({ data: musicGenres }));
  };

  const getData = () => {
    const artistFilter = _.groupBy(route.params.artists, 'eventQualifier');

    const newObj = {};
    Object.keys(artistFilter)
      .sort()
      .forEach(key => {
        newObj[key] = artistFilter[key];
      });

    let genres = [];
    let cant = [];

    for (let [key, value] of Object.entries(newObj)) {
      genres.push(key);
      cant.push(value.length);
    }

    let cantArtist = 0;
    cant.forEach(item => {
      cantArtist += item;
    });
    cant = cant.map(item => item / cantArtist);

    return { genres, cant, genreFavorite: Math.max(...cant) };
  };

  const renderItem = (title, cant, index) => (
    <View
      key={index + 'chart'}
      style={{ alignItems: 'center', width: 100, marginLeft: 10 }}>
      <TastesChart percentage={cant} index={index % 5} />
      <Text style={{ marginVertical: 10, textAlign: 'center' }} category="s2">
        {title}
      </Text>
    </View>
  );

  const { cant, genres, genreFavorite } = getData();

  return (
    <Container
      backgroundColor={theme['color-basic-100']}
      withBar={{ colorBar: theme['color-basic-100'], themeBar: 'dark' }}
      withHeader={{
        backgroundColor: theme['color-basic-100'],
        title: 'Perfilador',
        color: theme['text-basic-color'],
        accessoryLeft: {
          name: 'arrow-back',
          color: theme['text-basic-color'],
          onPress: () => navigation.goBack(),
        },
      }}>
      <View style={{ flex: 1 }}>
        <Loading
          visible={show_save_music_genre_profiler_spinner}
          text="Sincronizando datos, por favor espera..."
        />

        <ModalCard
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: () =>
              setModal({
                icon: undefined,
                text: undefined,
                title: undefined,
                visible: false,
              }),
          }}
          dataIcon={{ name: modal.icon }}
          text={modal.text}
          title={modal.title}
          visible={modal.visible}
        />

        <ScrollView>
          <View style={[Styles.alignCenter, { margin: 20 }]}>
            <Text category="h4">Lo tenemos</Text>
            <Text style={{ marginTop: 10, textAlign: 'center' }}>
              En tu perfil podrás hacer nuevamente el test y añadir nuevos
              gustos para descubrir más eventos
            </Text>
          </View>

          <View style={{ alignItems: 'center', paddingBottom: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <Avatar rounded size="xlarge" source={Iconos.VinylDisc}>
                <Accessory
                  size={40}
                  name="camera"
                  type="font-awesome-5"
                  iconStyle={{ fontSize: 20 }}
                  color={theme['color-primary-500']}
                  style={{ backgroundColor: theme['color-basic-100'] }}
                />
              </Avatar>
            </View>

            <Text
              category="p2"
              style={{
                marginTop: 20,
                fontSize: 20,
                color: theme['color-basic-600'],
              }}>
              Tu género favorito es
            </Text>

            <Text
              category="label"
              style={{ marginVertical: 10, textAlign: 'center', fontSize: 24 }}>
              {genres[cant.indexOf(genreFavorite)]}
            </Text>

            <TastesChart
              percentage={cant[cant.indexOf(genreFavorite)]}
              index={4}
            />
          </View>

          <View style={styles.containerChart}>
            <Text
              category="s2"
              style={{ color: theme['color-basic-600'], alignSelf: 'center' }}>
              Tus otros gustos
            </Text>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ flexDirection: 'row', marginVertical: 20 }}>
              {genres.map((item, index) =>
                renderItem(item, cant[index], index),
              )}
            </ScrollView>
          </View>
        </ScrollView>

        <View
          style={[
            Styles.containerModal,
            { position: 'relative', marginTop: -20 },
          ]}>
          <Button onPress={() => saveResultTastes(genres, cant)}>
            Finalizar
          </Button>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  containerChart: {
    paddingVertical: 20,
    shadowOffset: {
      width: -1,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: Colors.backgroundGray,
  },
});

export default ResultTastesScreen;
