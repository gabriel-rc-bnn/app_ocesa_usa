import React from 'react';
import * as FirebaseService from '../firebase';
import FastImage from 'react-native-fast-image';
import { Layout, Text } from '@ui-kitten/components';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { REPONSIVE_HEIGHT } from '../utils/config/Constants';
import { Spinner } from '.';

const BannerComponent = ({ data, navigation, title, spinner, error }) => {
  const { width } = Dimensions.get('window');

  return (
    <View style={{ width }}>
      {!spinner && !error && (
        <Layout style={{ marginTop: 10 }}>
          {data.activeTitle && (
            <Text
              category="label"
              status="primary"
              style={{ margin: 20, fontSize: 18, marginBottom: 10 }}>
              {title}
            </Text>
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Webview', {
                url: data.urlPromotion,
                nombre: title,
              });
              FirebaseService.logEvent(FirebaseService.eventName.bannerHome);
            }}>
            <FastImage
              style={{ width, height: REPONSIVE_HEIGHT }}
              source={{
                uri: data.banner_image,
                priority: FastImage.priority.normal,
              }}
            />
          </TouchableOpacity>
        </Layout>
      )}

      <Spinner visible={spinner} />
    </View>
  );
};

export default BannerComponent;
