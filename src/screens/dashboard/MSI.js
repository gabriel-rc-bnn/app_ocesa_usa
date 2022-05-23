import React from 'react';
import { Styles } from '../../utils';
import { Container } from '../../components';
import HTMLView from 'react-native-htmlview';
import { useTheme } from '@ui-kitten/components';
import { FONTS, STYLES_HTML_TAGS } from '../../utils/config/Constants';
import { ScrollView } from 'react-native';

const MSIScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const { data, label } = route.params;
  const htmlText = `<div>${data}<br></div>`;

  return (
    <Container
      withBar={{ colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-default'],
        title: label,
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => navigation.goBack(),
        },
      }}>
      <ScrollView style={Styles.container} showsVerticalScrollIndicator={false}>
        <HTMLView
          value={htmlText}
          stylesheet={STYLES_HTML_TAGS}
          textComponentProps={{
            style: {
              color: theme['text-default-color'],
              fontFamily: FONTS.regular,
              fontSize: 14,
              textAlign: 'justify',
            },
          }}
          paragraphBreak={''}
        />
      </ScrollView>
    </Container>
  );
};

export default MSIScreen;
