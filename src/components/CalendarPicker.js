import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Icon, Input, Text } from '@ui-kitten/components';
import moment from 'moment';
import 'moment/locale/es-mx';

const CalendarPickerComponent = ({ value, setValue }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setDateType] = useState(false);
  const [type, setType] = useState('');

  const showDatePicker = label => {
    if (label == 'desde') {
      setDateType(true);
    }
    setType(label);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setDateType(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setValue({ ...value, [type]: date });
  };

  const date = d => {
    moment.locale('es-mx');
    return moment(d).format('L');
  };

  return (
    <View>
      <Text
        style={{ color: '#056DAE', marginVertical: 15, fontWeight: 'bold' }}>
        Fecha
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '45%',
            height: 50,
          }}
          onPress={() => showDatePicker('desde')}>
          <Input
            placeholder={value.desde !== '' ? date(value.desde) : 'Desde'}
            isReadOnly={true}
            disabled={true}
            style={{
              color: '#6F6F6F',
              borderRadius: 50,
              textAlign: 'center',
              backgroundColor: '#EFEFEF',
              fontSize: 10,
            }}
          />
          <Icon name="calendar" pack="font-awesome-5" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '45%',
            height: 50,
          }}
          onPress={() => showDatePicker('hasta')}
          disabled={value.desde !== '' ? false : true}>
          <Input
            placeholder={value.hasta !== '' ? date(value.hasta) : 'Hasta'}
            isReadOnly={true}
            disabled={true}
            style={{
              color: '#6F6F6F',
              borderRadius: 50,
              textAlign: 'center',
              backgroundColor: '#EFEFEF',
            }}
          />
          <Icon name="calendar" pack="font-awesome-5" style={styles.icon} />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          minimumDate={
            value.desde == '' || dateType ? new Date() : new Date(value.desde)
          }
          cancelTextIOS="Cancelar"
          confirmTextIOS="Aceptar"
          headerTextIOS="Seleccionar fecha"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: '#E74C3D',
    fontSize: 20,
    marginLeft: 10,
  },
});

export default CalendarPickerComponent;
