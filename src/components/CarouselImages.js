import React from 'react';
import {
  REPONSIVE_HEIGHT,
  defaulHorizontalImage,
} from '../utils/config/Constants';
import { Spinner } from '.';
import FastImage from 'react-native-fast-image';
import { useTheme } from '@ui-kitten/components';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { setOptimizedImages } from '../utils/config/Functions';
import { Dimensions, TouchableWithoutFeedback, View } from 'react-native';
import { getDetailEvet } from '../services/connectApi/Events';

const { width } = Dimensions.get('window');

const CarouselImagesComponent = ({
  data,
  spinner = false,
  navigation,
  error = false,
}) => {
  const theme = useTheme();

  const pageLoad = async url => {
    const detail = await getDetailEvet(url);
    if (detail.ticketMasterUrl) {
      return navigation.navigate('Webview', {
        url: detail.ticketMasterUrl,
        nombre: detail.name,
      });
    }
    return navigation.navigate('EventDetailsAux', { data: detail });
  };

  const RenderItem = ({ image }) => {
    const _source = image;
    _source.dateTarget = _source.dates;
    return (
      <TouchableWithoutFeedback onPress={() => pageLoad(image.details_url)}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={{ width, height: REPONSIVE_HEIGHT }}
          source={{
            uri:
              setOptimizedImages(image.long_img_url, true) ||
              setOptimizedImages(image.imgUrl, true), 
              //defaulHorizontalImage(),
            priority: FastImage.priority.normal,
          }}
        />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ width }}>
      {!spinner && !error && (
        <SwiperFlatList
          autoplay
          autoplayLoop
          showPagination
          paginationActiveColor={theme['color-info-500']}
          paginationDefaultColor={theme['color-basic-100']}
          pageIndicatorStyle={{ backgroundColor: theme['color-basic-100'] }}
          paginationStyleItem={{ height: 6, width: 6, marginHorizontal: 4 }}>
          {data.map(item => (
            <RenderItem image={item} key={item.id} />
          ))}
        </SwiperFlatList>
      )}

      <Spinner visible={spinner} />
    </View>
  );
};

export default CarouselImagesComponent;
