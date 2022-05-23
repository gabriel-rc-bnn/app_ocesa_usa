import React from 'react';
import moment from 'moment';
import 'moment/locale/es-mx';
import { Colors, States } from '../utils';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import { clearEventDetails } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Avatar, Card, Text, useTheme } from '@ui-kitten/components';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Spinner } from '.';

const { width } = Dimensions.get('window');
const dispatch = useDispatch();
const CarouselComponent = ({
  data,
  title,
  navigation,
  date,
  spinner,
  error,
}) => {
  const theme = useTheme();

  const textStateVenue = (index, state, venue, stateRef) => {
    if (state.ref_id == stateRef) {
      return (
        <Text
          key={index}
          style={{ color: theme['color-basic-600'], fontSize: 12 }}
          numberOfLines={1}>
          <Text
            category="label"
            style={{ color: theme['color-basic-600'], fontSize: 12 }}>
            {state.shortName}
          </Text>
          /{venue}
        </Text>
      );
    } else {
      return null;
    }
  };

  const renderDate = dateOfCarousel => {
    moment.locale('es-mx');
    let d;

    if (dateOfCarousel instanceof Array) {
      if (dateOfCarousel.length == 0) {
        d = 'Sin fecha';
      } else if (dateOfCarousel.length === 1) {
        d = moment(dateOfCarousel[0]).format('LL');
      } else if (dateOfCarousel.length > 1) {
        d = 'Varias fechas';
      }
    } else {
      d = moment(dateOfCarousel).format('LL');
    }
    return d;
  };

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(clearEventDetails());
          navigation.push('EventDetailsAux', {
            url: item.details_url,
            name: item.name,
            suggestion: data,
          });
        }}
        style={{ marginRight: 20 }}>
        <FastImage
          style={styles.imgEvent}
          source={{
            uri: item.s_img_url,
            priority: FastImage.priority.normal,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}>
          <Avatar source={{ uri: item.s_img_url }} size="small" />

          <View style={{ width: 90, marginLeft: 5 }}>
            <Text
              category="label"
              numberOfLines={1}
              style={{ color: theme['color-primary-600'], fontSize: 14 }}>
              {item.name}
            </Text>

            <Text
              numberOfLines={1}
              style={{ color: theme['color-basic-600'], fontSize: 12 }}>
              {renderDate(date ? item.date : item.dates)}
            </Text>

            {States.map((state, index) =>
              textStateVenue(index, state, item.venue, item.stateRef),
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ width }}>
      {!spinner && !error && (
        <Card style={[styles.containerCard, { marginTop: date ? 0 : 10 }]}>
          <Text
            category="label"
            status="primary"
            style={{ marginBottom: 10, fontSize: 18 }}>
            {title}
          </Text>

          <Carousel
            data={data}
            itemWidth={150}
            sliderWidth={width}
            inactiveSlideScale={1}
            renderItem={RenderItem}
            inactiveSlideOpacity={1}
            activeSlideAlignment="start"
            removeClippedSubviews={false}
          />
        </Card>
      )}
      <Spinner visible={spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  imgEvent: {
    height: 170,
    borderRadius: 10,
    marginBottom: 5,
  },
  containerCard: {
    height: 300,
    backgroundColor: Colors.white,
  },
});

export default CarouselComponent;
