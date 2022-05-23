import React from 'react';
import { Styles } from '../../utils';
import { useTheme, Layout } from '@ui-kitten/components';
import { Container, NoticePrivacyText } from '../../components';

const NoticePrivacyScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <Container
      withScroll
      withBar={{ themeBar: 'light', colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-500'],
        title: 'Aviso de privacidad',
        align: 'center',
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => navigation.goBack(),
        },
      }}>
      <Layout style={Styles.container}>
        <NoticePrivacyText />
      </Layout>
    </Container>
  );
};

export default NoticePrivacyScreen;
