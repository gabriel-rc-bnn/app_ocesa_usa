import { Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardNoEventsView, Mosaic, Spinner } from '../../components';

const NextPresalesScreen = ({ data, navigation }) => {
  const renderData = () => {
    if (data.spinner) {
      return (
        <View style={styles.container}>
          <Spinner visible={data.spinner} />
          <Text style={{ marginTop: 30, fontSize: 16, color: '#686868' }}>
            Cargando contenido, por favor espera...
          </Text>
        </View>
      );
    }
    if (data.data instanceof Array && data.data.length > 0 && !data.error) {
      return (
        <Mosaic
          data={data.data}
          navigation={navigation}
          typeCard="events"
          presales
          isUpcomingPresales
        />
      );
    }
    return (
      <View style={{ marginTop: 10 }}>
        <CardNoEventsView message={'con Próximas ventas'} />
      </View>
    );
  };

  return renderData();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NextPresalesScreen;
