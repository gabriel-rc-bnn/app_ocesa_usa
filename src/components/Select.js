import { Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import SelectPicker from 'react-native-form-select-picker';

const SelectComponent = ({ data, title, value, setValue }) => {
  return (
    <View>
      <Text style={{ color: '#056DAE', fontWeight: 'bold' }}>{title}</Text>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15,
        }}>
        <SelectPicker
          onValueChange={setValue}
          selected={value}
          doneButtonText="OK"
          doneButtonTextStyle={{ color: '#056DAE', fontWeight: 'bold' }}
          placeholder="Selecciona"
          style={{
            width: '100%',
            backgroundColor: '#EFEFEF',
            borderRadius: 30,
            padding: 15,
            height: 50,
          }}>
          {Object.values(data).map((val, index) => (
            <SelectPicker.Item label={val} value={val} key={val} />
          ))}
        </SelectPicker>

        <Icon name="chevron-down" pack="font-awesome-5" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: '#6F6F6F',
    fontSize: 20,
    right: 35,
  },
});

export default SelectComponent;
