import { Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { Dimensions, PixelRatio, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

const CardNoEventsViewComponent = ({ message, notification }) => {
  return (
    <View
      style={[
        styles.viewStyle,
        { width: width - 20, marginTop: 10, alignSelf: 'center' },
      ]}>
      <Icon
        name="filter"
        pack="font-awesome-5"
        style={{ color: '#00bdf2', fontSize: 28, alignSelf: 'center' }}
      />
      <Text
        style={{
          color: '#686868',
          fontSize: 14,
          alignSelf: 'center',
          textAlign: 'center',
          marginTop: 10,
        }}>
        {notification
          ? 'No hay notificaciones en este momento'
          : `No hay eventos ${message} en este momento`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    borderRadius: 2,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
  },
});
export default CardNoEventsViewComponent;
