import React from 'react';
import { Styles } from '../../utils';
import { Layout, useTheme } from '@ui-kitten/components';
import { Container, TermsConditionsText } from '../../components';

const TermsAndConditionsScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <Container
      withScroll
      withBar={{ themeBar: 'light', colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-500'],
        title: 'Términos y condiciones',
        align: 'center',
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => navigation.goBack(),
        },
      }}>
      <Layout style={Styles.container}>
        <TermsConditionsText navigation={navigation} />
      </Layout>
    </Container>
  );
};

export default TermsAndConditionsScreen;
