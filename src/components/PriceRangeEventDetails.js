import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Text, useTheme } from '@ui-kitten/components';

const PriceRangeEventDetails = ({ minimalPrice, maximumPrice, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          height: 20,
        }}>
        <Icon
          name="ticket-alt"
          pack="font-awesome-5"
          style={{
            width: 18,
            height: 18,
            marginRight: 3,
            tintColor: theme['color-info-default'],
          }}
        />
        <Text category="p2" style={{ marginLeft: 10 }}>
          MX ${minimalPrice} - MX ${maximumPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PriceRangeEventDetails;
