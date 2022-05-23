import React, { useEffect, useState } from 'react';
import {
  sendDirectProfile,
  clearMessagesTastes,
  clearMessagesLogin,
} from '../../redux/actions';
import _ from 'lodash';
import { Constants, Styles } from '../../utils';
import { View, ScrollView } from 'react-native';
import * as FirebaseService from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, useTheme } from '@ui-kitten/components';
import { loadProfileGenres, loadGenres } from '../../redux/actions';
import { Container, Loading, TastesMatrix, ModalCard } from '../../components';

const TastesScreen = ({ navigation }) => {
  const theme = useTheme();
  const [modal, setModal] = useState({
    visible: false,
    text: undefined,
    title: undefined,
    icon: undefined,
  });
  const [genres, setGenres] = useState([]);
  const [selectGenres, setSelectGenres] = useState([]);

  const dispatch = useDispatch();
  const { Tastes, Search } = useSelector(state => state);

  useEffect(() => {
    //trackPage('editar-gustos');
    FirebaseService.logEvent(FirebaseService.eventName.syncTastesFavorites);

    dispatch(loadProfileGenres());
    dispatch(loadGenres());
  }, []);

  useEffect(() => {
    if (Search.load_genres_success.length > 0) {
      const data = Search.load_genres_success.map(item => {
        return { ...item, saved: false };
      });

      setGenres(data);

      if (!Tastes.show_load_profile_genres_spinner) {
        if (Object.keys(Tastes.load_profile_genres_success).length > 0) {
          let genresProfiler = [];

          if (
            typeof Tastes.load_profile_genres_success?.tastes?.musical ===
            'object'
          ) {
            Object.keys(
              Tastes.load_profile_genres_success?.tastes?.musical,
            ).forEach(item => {
              data.map(item2 => {
                if (item === item2.refId) {
                  item2.saved = true;
                  genresProfiler.push(item2);
                }
              });
            });
          }

          setGenres(data);
          setSelectGenres(genresProfiler);
        }
      }
    }

    // if (sendTastesSuccess) {
    //   trackEvent('editar-gustos', 'sincronizarGustos', 'exito');
    //   nextProps.clearMessagesLogin();
    // }

    // if (sendTastesSuccess === false) {
    //   trackEvent('editar-gustos', 'sincronizarGustos', 'error');
    //   Toast.show(
    //     'Ha ocurrido un error en la plataforma, por favor intenta más tarde',
    //     { duration: 6000, position: Toast.positions.CENTER },
    //   );
    // }
  }, [Tastes.show_load_profile_genres_spinner, Search.show_genres_spinner]);

  useEffect(() => {
    if (Object.keys(Tastes.load_send_tastes_success).length > 0) {
      dispatch(clearMessagesTastes());
      dispatch(clearMessagesLogin());

      navigation.navigate('TastesArtist', {
        data: selectGenres.filter(item => item.saved),
      });
    } else if (Tastes.load_send_tastes_fail.error) {
      setModal({
        visible: true,
        icon: 'exclamation-circle',
        title: '¡Error!',
        text: Constants.MESSAGES.errorPlatform,
      });
    }
  }, [Tastes.load_send_tastes_success]);

  const toObject = arr => {
    const rv = {};
    for (let i = 0; i < arr.length; ++i) {
      rv[arr[i]] = 1;
    }

    return rv;
  };

  const filterTastes = genres => {
    const objectTastes = { tastes: { musical: {} } };

    const newGenres = genres.map(genre => {
      if (genre.saved) {
        return genre.refId;
      }
      return null;
    });

    const arrayFilter = newGenres.filter(newGenre => newGenre !== null);

    if (arrayFilter.length >= 5) {
      objectTastes.tastes.musical = toObject(arrayFilter);
      dispatch(sendDirectProfile(objectTastes));
    } else {
      setModal({
        visible: true,
        icon: 'exclamation-circle',
        text: Constants.MESSAGES.insuficientTastes,
      });
    }
  };

  const RenderGenres = () => {
    if (
      Search.load_genres_fail.error ||
      Tastes.load_profile_genres_fail.error
    ) {
      return (
        <View style={[Styles.alignCenter, { flex: 1 }]}>
          <Text
            category="label"
            status="danger"
            style={{ textAlign: 'center' }}>
            No se han podido cargar los Géneros, intenta más tarde
          </Text>
        </View>
      );
    }

    if (genres.length > 0) {
      const genresFilter = _.groupBy(genres, 'type');

      const newObj = {};
      Object.keys(genresFilter)
        .sort()
        .forEach(function (key) {
          newObj[key] = genresFilter[key];
        });

      let genresList = [];

      for (let [key, value] of Object.entries(newObj)) {
        if (value.length > 0) {
          const newArray = _.orderBy(value, 'name', 'asc');

          let list = (
            <View key={key} style={{ alignItems: 'center', marginBottom: 20 }}>
              <Text
                category="h6"
                style={{ marginBottom: 10, color: theme['color-basic-600'] }}>
                {key}
              </Text>
              <TastesMatrix arrayTastes={newArray} selectGenre={selectGenres} />
            </View>
          );

          genresList.push(list);
        }
      }

      return (
        <View style={{ flex: 1, marginTop: 50 }}>
          <ScrollView>{genresList}</ScrollView>

          <View
            style={[
              Styles.containerModal,
              { margin: -20, position: 'relative' },
            ]}>
            <Button onPress={() => filterTastes(selectGenres)}>
              Continuar
            </Button>

            <Button
              appearance="ghost"
              status="control"
              style={{ marginTop: 20 }}
              onPress={() => navigation.navigate('Dashboard')}>
              {() => (
                <Text
                  category="s2"
                  status="control"
                  style={{ textDecorationLine: 'underline' }}>
                  Ir al inicio
                </Text>
              )}
            </Button>
          </View>
        </View>
      );
    }

    return null;
  };

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
      <View style={Styles.container}>
        <Loading
          visible={
            Tastes.show_load_profile_genres_spinner ||
            Search.show_genres_spinner ||
            Tastes.show_taste_select_spinner
          }
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

        <View style={Styles.alignCenter}>
          <Text category="h4">Resultado</Text>
          <Text style={{ marginTop: 10, textAlign: 'center' }}>
            Elige por lo menos 5 de tus gustos
          </Text>
        </View>

        <RenderGenres />
      </View>
    </Container>
  );
};

export default TastesScreen;
