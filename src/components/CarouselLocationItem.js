import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card } from '@ui-kitten/components';

const CarouselLocationItemComponent = ({
  imagePropsStyle,
  viewPropsStyle,
  img_url,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={[styles.viewStyle, viewPropsStyle]} disabled>
        <FastImage
          style={[styles.imageStyle, imagePropsStyle, { left: -24, top: -17 }]}
          source={{
            uri: img_url,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    width: 135,
    height: 135,
  },
  imageStyle: {
    height: 135,
    width: 134.5,
    marginTop: 0,
  },
});

export default CarouselLocationItemComponent;
