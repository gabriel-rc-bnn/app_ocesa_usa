import React, { useState } from 'react';
import { Styles } from '../../utils';
import { Container } from '../../components';
import FastImage from 'react-native-fast-image';
import { Backgrounds, Iconos } from '../../assets/img';
import { Button, Text, useTheme } from '@ui-kitten/components';
import { StyleSheet, View, Dimensions, Modal } from 'react-native';

const { height, width } = Dimensions.get('window');

const WelcomeTastesScreen = ({ navigation }) => {
  const theme = useTheme();
  const [modal, setModal] = useState(false);

  const GoHome = () => (
    <Button
      appearance="ghost"
      status="control"
      style={{ marginTop: 20 }}
      onPress={() => navigation.navigate('Dashboard')}>
      {() => (
        <Text
          category="s2"
          status="control"
          style={{ textDecorationLine: 'underline' }}>
          Ir al inicio
        </Text>
      )}
    </Button>
  );

  return (
    <Container
      backgroundColor={theme['color-basic-100']}
      withBar={{ colorBar: theme['color-basic-100'], themeBar: 'dark' }}>
      <View style={Styles.container}>
        <FastImage source={Backgrounds.Ondas} style={styles.imageStyle} />

        <View style={{ flex: 1, ...Styles.alignCenter }}>
          <Text category="h4">Bienvenido</Text>
          <Text style={{ marginTop: 20, textAlign: 'center' }}>
            Queremos conocer tus gustos musicales y de entretenimiento para
            ofrecerte una mejor experiencia
          </Text>

          <FastImage style={styles.image2Style} source={Iconos.BoyMusic} />

          <View style={{ height: 100 }} />
        </View>

        <View style={Styles.containerModal}>
          <Button onPress={() => setModal(true)}>Siguiente</Button>
          <GoHome />
        </View>
      </View>

      <Modal animationType="fade" visible={modal}>
        <View style={Styles.container}>
          <FastImage source={Backgrounds.Ondas} style={styles.imageStyle} />

          <View style={{ flex: 1, ...Styles.alignCenter }}>
            <Text category="h4">Conectemos</Text>
            <Text style={{ marginTop: 20, textAlign: 'center' }}>
              Automáticamente te mostraremos una lista de los eventos que
              podrían interesarte
            </Text>

            <FastImage style={styles.image3Style} source={Iconos.GirlMusic} />
          </View>

          <View style={Styles.containerModal}>
            <Button
              onPress={() => {
                navigation.navigate('Tastes');
                setModal(false);
              }}>
              Continuar
            </Button>
            <GoHome />
          </View>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height,
    width,
    position: 'absolute',
    top: 150,
  },
  image2Style: {
    marginVertical: 100,
    width: width * 0.4,
    height: width * 0.4,
  },
  image3Style: {
    marginLeft: 30,
    width: width,
    height: width,
  },
});

export default WelcomeTastesScreen;
