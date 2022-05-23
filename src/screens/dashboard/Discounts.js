import React from 'react';
import { Styles } from '../../utils';
import { StyleSheet } from 'react-native';
import { Container } from '../../components';
import { Layout, Text, useTheme } from '@ui-kitten/components';

const DiscountScreen = ({ navigation, route }) => {
  const { label } = route.params;
  const theme = useTheme();

  return (
    <Container
      withBar={{ themeBar: 'light', colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-500'],
        title: label,
        align: 'center',
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => navigation.goBack(),
        },
      }}>
      <Layout style={[Styles.container, styles.container]}>
        <Text>Esta es la pantalla de descuentos Citibanamex</Text>
      </Layout>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DiscountScreen;
