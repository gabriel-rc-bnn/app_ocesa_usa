import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Loading } from '.';
import { Genres } from '../assets/img';
import * as FirebaseService from '../firebase';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import { loadArtistsWithGenders } from './../redux/actions';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Icon, Text, CheckBox, useTheme } from '@ui-kitten/components';

const { width } = Dimensions.get('window');

const SECTIONS = [
  {
    title: 'Electrónica',
    imageBack: Genres.Eletronica,
  },
  {
    title: 'Jazz',
    imageBack: Genres.Jazz,
  },
  {
    title: 'Pop',
    imageBack: Genres.Pop,
  },
  {
    title: 'Rock',
    imageBack: Genres.Rock,
  },
  {
    title: 'Teatro',
    imageBack: Genres.Teatro,
  },
  {
    title: "80's",
    imageBack: Genres['80s'],
  },
  {
    title: "90's",
    imageBack: Genres['90s'],
  },
  {
    title: 'Alternativo',
    imageBack: Genres.Alternativo,
  },
  {
    title: 'Banda',
    imageBack: Genres.Banda,
  },
  {
    title: 'Cumbia',
    imageBack: Genres.Cumbia,
  },
  {
    title: 'Folk',
    imageBack: Genres.Folk,
  },
  {
    title: 'Hip Hop',
    imageBack: Genres.Hiphop,
  },
  {
    title: 'Indie',
    imageBack: Genres.Indie,
  },
  {
    title: 'Metal',
    imageBack: Genres.Metal,
  },
  {
    title: 'Norteño',
    imageBack: Genres.Norteno,
  },
  {
    title: 'Pop Latino',
    imageBack: Genres.PopLatino,
  },
  {
    title: 'R&B',
    imageBack: Genres['R&B'],
  },
  {
    title: 'Reggae',
    imageBack: Genres.Reggae,
  },
  {
    title: 'Reggaetón',
    imageBack: Genres.Reggaeton,
  },
  {
    title: 'Regional Mexicano',
    imageBack: Genres.RegionalMex,
  },
  {
    title: 'Rock Latino',
    imageBack: Genres.RockLatino,
  },
  {
    title: 'Salsa',
    imageBack: Genres.Salsa,
  },
  {
    title: 'Ska',
    imageBack: Genres.Ska,
  },
  {
    title: 'World Music',
    imageBack: Genres.WorldMusic,
  },
];

const TastesArtistMatrix = ({ genres, activeItems }) => {
  const theme = useTheme();
  const [activeSections, setActiveSections] = useState([]);

  const dispatch = useDispatch();
  const {
    show_artists_genders_spinner,
    load_artists_genders_success,
    load_artists_genders_fail,
  } = useSelector(state => state.Tastes);

  useEffect(() => {
    FirebaseService.trackScreen(FirebaseService.pageName.profile);
    dispatch(loadArtistsWithGenders());
  }, []);

  const RenderHeader = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <View
        style={styles.header}
        // onTouchStart={() => setIsExpanded(!isExpanded)}
      >
        <FastImage style={styles.imageList} source={item?.imageBack} />
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          style={{
            height: 35,
            width: 35,
            tintColor: theme['color-basic-100'],
            position: 'absolute',
            right: 15,
          }}
        />

        <Text status="control" category="h6">
          {item?.title}
        </Text>
      </View>
    );
  };

  const RenderItem = ({ data }) => {
    const [active, setActive] = useState(false);

    return (
      <View style={{ flexDirection: 'row' }}>
        {/* <FastImage
          style={{
            width: 60,
            height: 60,
            borderRadius: 100,
            overflow: "hidden",
          }}
          source={require("../assets/img/images_categorias/Generos_Ocesa_Rock.jpg")}
        /> */}
        <View style={{ marginLeft: 20, flex: 1 }}>
          <Text category="label" style={{ color: theme['color-primary-600'] }}>
            {data.name}
          </Text>
          <Text style={{ color: theme['color-basic-600'] }}>
            {data.description}
          </Text>
        </View>

        <CheckBox
          status="info"
          onChange={value => {
            data.selected = !data.selected;

            if (data?.selected !== false && !activeItems.includes(data)) {
              activeItems.push(data);
            }

            setActive(value);
          }}
          checked={active}
        />
      </View>
    );
  };

  const RenderContent = ({ item }) => {
    const dataFilter = _.orderBy(item?.data, 'name', 'asc');

    return (
      <View
        style={{
          paddingVertical: 20,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#B4B4B4',
        }}>
        {dataFilter.map((value, index) => (
          <RenderItem data={value} key={index + 'item'} />
        ))}
      </View>
    );
  };

  const getData = () => {
    let data = [];

    if (load_artists_genders_success.length > 0) {
      const artist = load_artists_genders_success.filter(
        item => item.eventQualifier !== undefined && item.active,
      );
      const artistFilter = _.groupBy(artist, 'eventQualifier');

      const newObj = {};
      Object.keys(artistFilter)
        .sort()
        .forEach(key => {
          newObj[key] = artistFilter[key];
        });

      for (let [key, value] of Object.entries(newObj)) {
        const itemGenre = SECTIONS.filter(item => item.title === key);

        if (itemGenre.length > 0) {
          data.push({
            ...itemGenre[0],
            data: value,
          });
        }
      }

      let filterArtist = [];
      genres.forEach(item => {
        const artist = data.filter(item2 => item.name === item2.title);

        if (artist.length > 0) {
          filterArtist.push(artist[0]);
        }
      });

      data = filterArtist;
    }

    return data;
  };

  return (
    <View>
      <Loading visible={show_artists_genders_spinner} />

      {!load_artists_genders_fail.error ? (
        <Accordion
          sections={getData()}
          activeSections={activeSections}
          renderHeader={data => <RenderHeader item={data} />}
          renderContent={data => <RenderContent item={data} />}
          onChange={setActiveSections}
          containerStyle={{ marginBottom: 30 }}
          sectionContainerStyle={{
            marginBottom: 20,
            overflow: 'hidden',
            borderRadius: 5,
          }}
        />
      ) : (
        <View style={[Styles.alignCenter, { flex: 1 }]}>
          <Text
            category="label"
            status="danger"
            style={{ textAlign: 'center' }}>
            No se han podido cargar los artistas, intenta más tarde
          </Text>
        </View>
      )}
    </View>
  );
};

export default TastesArtistMatrix;

const styles = StyleSheet.create({
  header: {
    height: 100,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  imageList: {
    height: 100,
    width,
    position: 'absolute',
  },
});
