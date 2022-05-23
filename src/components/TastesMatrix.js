import React, { useState } from 'react';
import { TastesButton } from '.';
import { Colors } from '../utils';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';

const TastesMatrixComponent = ({ arrayTastes, selectGenre }) => {
  const theme = useTheme();

  const selectTasteItem = (taste, index) => {
    arrayTastes[index].saved = !taste.saved;

    if (
      arrayTastes[index].saved !== false &&
      !selectGenre.includes(arrayTastes[index])
    ) {
      selectGenre.push(arrayTastes[index]);
    }
  };

  const { checkboxContainer } = styles;

  return arrayTastes.map((taste, index) => {
    const [select, setSelect] = useState(taste.saved);

    return (
      <View
        key={taste.id}
        style={
          select
            ? [
                checkboxContainer,
                { backgroundColor: theme['color-info-default'] },
              ]
            : checkboxContainer
        }>
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={select ? { color: theme['color-basic-100'] } : undefined}>
            {taste.name}
          </Text>
        </View>

        <TastesButton
          onPress={() => {
            setSelect(!select);
            selectTasteItem(taste, index);
          }}
          color1={select ? theme['color-info-700'] : theme['color-basic-400']}
          color2={select ? theme['color-info-700'] : theme['color-basic-500']}
        />
      </View>
    );
  });
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: Colors.white,
    paddingVertical: 5,
    paddingHorizontal: 20,
    shadowColor: Colors.black,
    width: '100%',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default TastesMatrixComponent;
