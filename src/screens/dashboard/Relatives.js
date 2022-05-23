import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetailEvet } from '../../services/connectApi/Events';
import { loadFamilyEvents, clearEventDetails } from '../../redux/actions';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container } from '../../components';
import { Layout, Text, useTheme } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';

const RelativesScreen = ({ navigation }) => {
  const getInfo = async info => {
    const detail = await getDetailEvet(info);
    return navigation.navigate('EventDetailsAux', { data: detail });
  };

  const { Search } = useSelector(state => state);
  const dispatch = useDispatch();

  const familySpinner = useSelector(
    state => state.Search.show_family_events_spinner,
  );
  const familyData = useSelector(
    state => state.Search.load_family_events_success,
  );
  const familyError = useSelector(
    state => state.Search.load_family_events_fail,
  );

  useEffect(() => {
    dispatch(loadFamilyEvents());
  }, []);
  //console.log(JSON.stringify(familyData));

  const getData = () => {
    let c = 0;
    let data = [];
    for (c = 0; c < familyData.length; c++) {
      let params = {
        nombre: familyData[c]?.name,
        img: familyData[c]?.s_img_url,
        ciudad: familyData[c]?.stateRef,
        locacion: familyData[c]?.venue,
        details: familyData[c]?.details_url,
      };
      data.push(params);
    }
    return data;
  };
  const theme = useTheme();
  const data = getData();

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.viewStyle}
        onPress={() => {
          dispatch(clearEventDetails());
          navigation.navigate('EventDetailsAux', {
            url: item.details,
            name: item.nombre,
          });
        }}>
        <FastImage
          style={{ height: 170, borderRadius: 10, marginBottom: 5 }}
          source={{
            uri: item.img,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{ marginLeft: 10 }}>
          <Text
            category="label"
            numberOfLines={1}
            style={{ color: theme['color-primary-600'], fontSize: 14 }}>
            {item.nombre}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: theme['color-basic-600'], fontSize: 12 }}>
            Varias fechas
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: theme['color-basic-600'], fontSize: 12 }}>
            {item.ciudad} / {item.locacion}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: '#fff',
        }}>
        {data.map((item, index) => renderItem(item, index))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginVertical: 10,
    marginHorizontal: 10,
    width: 140,
    height: 230,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default RelativesScreen;
