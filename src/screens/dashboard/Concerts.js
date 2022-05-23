import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCalendarEvents, clearEventDetails } from '../../redux/actions';
import { getDetailEvet } from '../../services/connectApi/Events';
import * as FirebaseService from '../../firebase';
import moment from 'moment';
import { Spinner } from '../../components';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container } from '../../components';
import {
  Button,
  Divider,
  Icon,
  Layout,
  List,
  Modal,
  Text,
  useTheme,
} from '@ui-kitten/components';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Functions, Constants } from '../../utils';
import { States, Months } from '../../utils/config';
import FastImage from 'react-native-fast-image';

const { formatDate2 } = Functions;
const { EVENT_CATEGORY } = Constants;
const ConcertsScreen = ({ navigation, spinner = false, error = false }) => {
  const getInfo = async info => {
    const detail = await getDetailEvet(info);
    return navigation.navigate('EventDetailsAux', { data: detail });
  };

  const { Calendar } = useSelector(state => state);

  const dispatch = useDispatch();

  const calendarSpinner = useSelector(
    state => state.Calendar.show_calendar_spinner,
  );
  const calendarData = useSelector(
    state => state.Calendar.load_calendar_events_success,
  );
  const calendarError = useSelector(
    state => state.Calendar.load_calendar_events_fail,
  );

  const [visible, setVisible] = useState(false);
  const [visibleDates, setVisibleDates] = useState(false);
  const [selectPosition, setSelectedPosition] = useState(1);
  const [selectMonth, setSelectMonth] = useState(1);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    let month = moment().format('MM');
    month = parseInt(month, 10);
    let year = moment().format('YYYY');
    year = parseInt(year, 10);
    dispatch(
      loadCalendarEvents(
        moment().toISOString(),
        moment().add(1, 'years').endOf('month').toISOString(),
        States[selectPosition].id,
        `${EVENT_CATEGORY.concert},${EVENT_CATEGORY.festival}`,
      ),
    );
  }, [selectPosition]);

  const getData = () => {
    let c;
    let data = [];
    for (c = 0; c < calendarData.length; c++) {
      const auxdata = formatDate2(calendarData[c]?.date);

      let params = {
        dia: auxdata.day,
        mes: auxdata.month,
        titulo: calendarData[c]?.event.name,
        data: [
          {
            img: calendarData[c]?.event.squaredImageUrl,
            name: calendarData[c]?.event.name,
            locacion: calendarData[c]?.venue.name,
            horario: calendarData[c]?.time,
            details: calendarData[c]?.event.details_url,
          },
        ],
      };
      if (Months[selectMonth]?.name === auxdata.month) {
        data.push(params);
      }
    }
    return data;
  };
  const data = getData();
  const theme = useTheme();
  const dates = Months;

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => downModal(index)}
      style={{ marginTop: 4, marginBottom: 4 }}>
      <Text
        category="p2"
        style={{ color: theme['color-primary-600'], textAlign: 'center' }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const downModal = index => {
    setVisible(false);
    setSelectedPosition(index);
  };

  const renderItemDates = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectMonth(index);
        setVisibleDates(false);
      }}>
      <Text
        category="p2"
        style={{
          color: theme['color-primary-600'],
          textAlign: 'center',
          marginTop: 4,
          marginBottom: 4,
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderItemItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(clearEventDetails());
          navigation.navigate('EventDetailsAux', {
            url: item.details,
            name: item.name,
          });
        }}>
        <Grid style={{ alignItems: 'center', marginTop: 10 }}>
          <Col size={30} style={{ marginLeft: 10 }}>
            <FastImage
              style={{ height: 100, width: 100, borderRadius: 15 }}
              source={{
                uri: item.img,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Col>
          <Col size={70}>
            <Text
              style={{
                fontSize: 15,
                color: theme['color-basic-600'],
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
            <Text
              category="c1"
              numberOfLines={1}
              style={{ color: theme['color-basic-600'] }}>
              {item.locacion}
            </Text>
            <Text
              category="c1"
              numberOfLines={1}
              style={{ color: theme['color-basic-600'] }}>
              Horario: {item.horario}
            </Text>
          </Col>
        </Grid>
      </TouchableOpacity>
    );
  };

  const renderItemListt = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (info == index) {
            setInfo(null);
          } else {
            setInfo(index);
          }
        }}>
        <Grid style={{ alignItems: 'center', marginTop: 6, marginBottom: 6 }}>
          <Col size={15}>
            <Text
              style={{ textAlign: 'center', fontSize: 25, color: '#60C2E6' }}>
              {item.dia}
            </Text>
            <Text
              style={{ textAlign: 'center', fontSize: 15, color: '#60C2E6' }}>
              {item.mes}
            </Text>
          </Col>
          <Col size={75}>
            <Text style={{ fontSize: 15, color: theme['color-basic-600'] }}>
              {item.titulo}
            </Text>
          </Col>
          <Col size={10}>
            <Icon
              name={info == index ? 'chevron-up' : 'chevron-down'}
              pack="font-awesome-5"
              style={{ color: '#60C2E6', fontSize: 20 }}
            />
          </Col>
        </Grid>
        {info == index ? (
          <List data={item.data} renderItem={renderItemItem} />
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Row
        style={{
          backgroundColor: theme['color-basic-400'],
          height: 50,
          alignItems: 'center',
        }}>
        <Col>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
              FirebaseService.logEvent(
                FirebaseService.eventName.billboardSearchByState,
              );
            }}>
            <Text
              category="p2"
              style={{ alignContent: 'center', textAlign: 'center' }}>
              {selectPosition == -1
                ? States[0].name
                : States[selectPosition].name}
              <Icon
                name="chevron-down"
                pack="font-awesome-5"
                style={{ fontSize: 15 }}
              />
            </Text>
          </TouchableOpacity>
        </Col>
        <Col>
          <TouchableOpacity
            onPress={() => {
              setVisibleDates(true);
              FirebaseService.logEvent(
                FirebaseService.eventName.billboardSearchByMonth,
              );
            }}>
            <Text
              category="p2"
              style={{ alignContent: 'center', textAlign: 'center' }}>
              {selectMonth == -1 ? Months[0].name : Months[selectMonth].name}
              <Icon
                name="chevron-down"
                pack="font-awesome-5"
                style={{ fontSize: 15 }}
              />
            </Text>
          </TouchableOpacity>
        </Col>
      </Row>

      <List
        data={data}
        renderItem={renderItemListt}
        ItemSeparatorComponent={Divider}
      />
      {!spinner && !error && (
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          style={{ width: 250, height: 450 }}>
          <List
            data={States}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
          />
          <Button
            style={{ marginTop: 10 }}
            status="basic"
            onPress={() => setVisible(false)}>
            Cancelar
          </Button>
        </Modal>
      )}
      <Spinner visible={spinner} />

      <Modal
        visible={visibleDates}
        backdropStyle={styles.backdrop}
        style={{ width: 250, height: 450 }}>
        <List
          data={Months}
          ItemSeparatorComponent={Divider}
          renderItem={renderItemDates}
        />
        <Button
          style={{ marginTop: 10 }}
          status="basic"
          onPress={() => setVisibleDates(false)}>
          Cancelar
        </Button>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ConcertsScreen;
