import React, { useEffect, useState } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { StyleSheet, View } from 'react-native';
import { Colors, Styles, UserCache } from '../../utils';
import { CardNoEventsView, Container } from '../../components';
import { Icon, Layout, List, Text, useTheme } from '@ui-kitten/components';

const NotificationsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function getNotifications() {
      let data = await UserCache.getNotifications();

      if (!data[0]?.error) {
        setNotifications(_.orderBy(data, 'date', 'asc'));
      }
    }

    getNotifications();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          height: 100,
          marginVertical: 10,
          width: '100%',
          borderRadius: 25,
          padding: 20,
          justifyContent: 'center',
          backgroundColor: Colors.backgroundGray,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Text category="label" style={{ flex: 1 }}>
            {item.text}
          </Text>

          <Icon
            name="bell"
            solid
            pack="font-awesome-5"
            style={{
              height: 20,
              width: 20,
              tintColor: Colors.active,
              alignSelf: 'flex-start',
            }}
          />
        </View>
        <Text category="c2" style={{ marginTop: 5 }}>
          {moment(new Date(item.date)).format('ddd, MMM D  h:mm A')}
        </Text>
      </View>
    );
  };

  return (
    <Container
      withBar={{ themeBar: 'light', colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-500'],
        title: 'Notificaciones',
        align: 'center',
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => navigation.goBack(),
        },
      }}>
      {notifications.length > 0 ? (
        <Layout style={Styles.container}>
          <List
            renderItem={renderItem}
            data={notifications}
            style={{ backgroundColor: 'transparent' }}
          />
        </Layout>
      ) : (
        <CardNoEventsView notification={true} />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationsScreen;
