import React from 'react';
import { View, Dimensions } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Text } from '@ui-kitten/components';

const { width } = Dimensions.get('window');

const RangeSliderComponent = ({
  label,
  min,
  max,
  step,
  initialValue,
  textMarker,
  setValue,
}) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: '#056DAE', fontWeight: 'bold' }}>{label}</Text>
        <Text category="c1" style={{ color: '#6F6F6F' }}>
          {textMarker}
        </Text>
      </View>

      <MultiSlider
        min={min}
        max={max}
        values={initialValue}
        step={step}
        enabledTwo={false}
        onValuesChangeFinish={setValue}
        sliderLength={width - 40}
      />
    </View>
  );
};

export default RangeSliderComponent;
