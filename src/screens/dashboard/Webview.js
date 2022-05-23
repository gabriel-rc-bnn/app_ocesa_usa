import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { useTheme } from '@ui-kitten/components';
import { Container, Loading } from '../../components';

const WebviewScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { url, nombre } = route.params;

  const [load, setLoad] = useState(true);

  return (
    <Container
      withBar={{ themeBar: 'light', colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-500'],
        title: nombre,
        align: 'center',
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => navigation.goBack(),
        },
      }}>
      <WebView
        source={{ uri: url }}
        onLoad={() => setLoad(false)}
        style={{ flex: 1 }}
      />

      <Loading
        visible={load}
        barStyle="dark"
        statusText="info"
        backdropColor="transparent"
        colorSpinner={theme['color-info-500']}
      />
    </Container>
  );
};

export default WebviewScreen;
