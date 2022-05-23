import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ListAssits } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMyEventsInterest,
  getMyEventsAttendance,
} from '../../redux/actions';
import { Functions } from '../../utils';
import { Card, Icon, Text, useTheme } from '@ui-kitten/components';

const { formatDate2 } = Functions;

const AssistScreen = ({ navigation }) => {
  const theme = useTheme();
  const { MyInterest } = useSelector(state => state);

  const dispatch = useDispatch();

  const assisteSpinner = useSelector(
    state => state.MyInterest.show_get_event_attendance_spinner,
  );
  const assisteData = useSelector(
    state => state.MyInterest.load_get_events_attendance_succes,
  );
  const assisteError = useSelector(
    state => state.MyInterest.load_get_events_attendance_fail,
  );
  useEffect(() => {
    dispatch(getMyEventsAttendance());
  }, []);
  const listData = () => {
    let c = 0;
    let data = [];
    for (c = 0; c < assisteData.length; c++) {



      if(assisteData[c]?.body && assisteData[c]?.body.date)
      {
        const auxDate = formatDate2(assisteData[c]?.body.date);
        let params = {
          nombre: assisteData[c]?.body.event.name,
          img: assisteData[c]?.body.event.squaredImageUrl,
          dia: auxDate.day,
          mes: auxDate.month,
          ciudad: assisteData[c]?.body.stateRef,
          locacion: assisteData[c]?.body.venue.name,
          horaInicio: assisteData[c]?.body.time,
          detail: assisteData[c]?.body.event.details_url,
          tiket: assisteData[c].body.tickerSalesUrl,
          coordenada: assisteData[c]?.body.venue.location,
        };
        data.push(params);
      }


    }
    return data;
  };
  const dataList = listData();

  return (
    <>
      {dataList.length === 0 ? (
        <Card style={{ flex: 0, marginTop: 15, alignSelf: 'center' }}>
          <Icon
            name="heart"
            pack="font-awesome-5"
            style={{
              marginTop: 5,
              fontSize: 30,
              alignSelf: 'center',
              color: theme['color-info-500'],
            }}
          />
          <Text
            category="c1"
            style={{
              marginTop: 5,
              textAlign: 'center',
              color: theme['color-basic-600'],
            }}>
            Aún no has agregado eventos a los que asistirás. ¡Empieza ahora!
          </Text>
        </Card>
      ) : (
        <ListAssits navigation={navigation} data={dataList} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AssistScreen;
