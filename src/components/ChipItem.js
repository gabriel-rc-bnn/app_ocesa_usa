import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { Button } from '.';

const ChipItemComponent = ({ label, active = Function }) => {
  const [selected, setSelected] = useState(false);
  const { width } = Dimensions.get('window');
  const mySliderLength = width / 4 - 8;

  return (
    <Button
      containerPropsButtonStyle={{ marginTop: 0 }}
      buttonPropsStyle={{
        borderWidth: 0,
        backgroundColor: '#056DAE',
        width: mySliderLength,
        padding: 0,
        height: 50,
        backgroundColor: selected ? '#056DAE' : 'transparent',
        borderLeftWidth: 1,
        borderColor: '#EFEFEF',
      }}
      textPropsButtonStyle={{
        color: selected ? '#fcfcfc' : '#6F6F6F',
        fontSize: 12,
      }}
      onPress={() => {
        setSelected(!selected);
        active(!selected);
      }}>
      {label}
    </Button>
  );
};

export default ChipItemComponent;
