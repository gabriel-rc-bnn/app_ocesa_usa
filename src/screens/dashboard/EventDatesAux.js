import React from 'react';
import moment from 'moment';
import 'moment/locale/es-mx';
import { UserCache } from '../../utils';
import { saveMyEventAttendance } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Styles } from '../../utils';
import Toast from 'react-native-root-toast';
import { Container } from '../../components';
import { Col, Row } from 'react-native-easy-grid';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import { Layout, Text, useTheme, Icon, Button } from '@ui-kitten/components';

const EventDatesAuxScreen = ({ data, navigation }) => {
  const theme = useTheme();
  moment.locale('es-mx');
  const day = moment(data.dates[0]?.date).date();
  const mounth = moment(data.dates[0]?.date).format('MMM');
  const dispatch = useDispatch();

  const calendarEvent = () => {
    moment.locale('es-mx');
    const eventConfig = {
      title: data.name,
      startDate: moment(data.dates[0].date).format(
        'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
      ),
      endDate: moment(data.dates[0].date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      location: data.dates[0].venueName,
      notes: `${data.name}\n${data.dates[0].venueName}\n${
        data.dates[0].state
      }\n${moment(data.dates[0].date).format('LLL')}\n\nComprar boletos: ${
        data.ticketMasterUrl
      }`,
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(eventInfo => {})
      .catch(error => {});
  };

  return (
    <Container>
      <Layout style={Styles.container}>
        <Text category="h6" style={{ color: theme['color-primary-600'] }}>
          {data.dates[0].state}
        </Text>
        <View style={[styles.contentView, { marginTop: 20, marginBottom: 20 }]}>
          <View style={{ marginRight: 20, alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>{day}</Text>
            <Text style={{ fontSize: 20 }}>{mounth}</Text>
          </View>
          <View>
            <Text style={{ color: theme['color-info-500'] }}>{data.name}</Text>
            <Text category="c1" style={styles.info}>
              {data.dates[0].venueName}
            </Text>
            <Text category="c1" style={styles.info}>
              Inicio: {data.dates[0].time} hrs.
            </Text>
            <Text category="c1">Preventa Citibanamex</Text>
          </View>
        </View>
        <Row>
          <Col
            style={{
              marginLeft: 15,
              marginRight: 15,
            }}>
            <TouchableOpacity onPress={() => calendarEvent()}>
              <View
                style={[styles.contentView, { width: 100, marginBottom: 10 }]}>
                <Icon
                  name="calendar-week"
                  pack="font-awesome-5"
                  style={styles.icons}
                />
                <Text category="c1" style={{ marginLeft: 10 }}>
                  Agrega a tu calendario
                </Text>
              </View>
            </TouchableOpacity>
            <Button
              onPress={async () => {
                if (await UserCache.getToken()) {
                  const datas = [];
                  datas.push(data);
                  dispatch(saveMyEventAttendance(data.dates[0].id, datas));

                  Toast.show('Evento agregado correctamente', {
                    duration: 4000,
                    position: Toast.positions.CENTER,
                  });
                } else {
                  Toast.show('Debe iniciar sesión para añadir eventos', {
                    duration: 4000,
                    position: Toast.positions.CENTER,
                  });
                }
              }}
              style={{ backgroundColor: 'transparent' }}
              appearance="outline"
              status="info">
              Asistiré
            </Button>
          </Col>
          <Col style={{ marginLeft: 15, marginRight: 15 }}>
            <View
              style={[styles.contentView, { width: 100, marginBottom: 10 }]}>
              <Icon
                name="ticket-alt"
                pack="font-awesome-5"
                style={styles.icons}
              />
              <Text category="c1" style={{ marginLeft: 10 }}>
                MX ${data.dates[0].minimalPrice}- MX $
                {data.dates[0].maximumPrice}
              </Text>
            </View>
            <Button
              onPress={() =>
                navigation.navigate('Webview', {
                  nombre: data.name,
                  url: data.ticketMasterUrl,
                })
              }
              style={{
                marginLeft: 10,
                backgroundColor: '#2C8614',
                borderColor: '#2C8614',
              }}>
              Comprar
            </Button>
          </Col>
        </Row>
      </Layout>
    </Container>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 10,
  },
  icons: {
    width: 15,
    height: 15,
    color: '#60C2E6',
  },
  info: {
    marginBottom: 5,
  },
});

export default EventDatesAuxScreen;
