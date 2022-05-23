import React, { useState, useEffect } from 'react';
import {
  Text,
  List,
  Card,
  Icon,
  Button,
  useTheme,
} from '@ui-kitten/components';
import { UserCache } from '../utils';
import { Share } from 'react-native';
import { clearEventDetails } from '../redux/actions';
import FastImage from 'react-native-fast-image';
import { Col, Row } from 'react-native-easy-grid';
import { TouchableOpacity } from 'react-native';
import { Popup } from 'react-native-map-link';
import { getDetailEvet } from '../services/connectApi/Events';
import { useDispatch } from 'react-redux';

const ListAssitsComponent = ({ data, navigation }) => {
  const [visiblePopover, setVisiblePopover] = useState(false);
  const [position, setPosition] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();

  const getPosition = async () => {
    const getDataPosition = await UserCache.getLocation();
    setPosition(getDataPosition);
  };

  const shareInformation = (name, venue, state, date, url) => {
    const ticketsUrl = url;
    let shareMessage = `${name}\n${venue}\n${state}\n${date}\n\nComprar boletos: ${ticketsUrl}`;

    if (!ticketsUrl) shareMessage = `${name}\n${venue}\n${state}\n${date}`;

    Share.share({
      message: shareMessage,
      title: name,
    });
  };

  useEffect(() => {
    getPosition();
  }, []);

  const renderPopover = item => {
    if (Object.keys(data).length > 0 && Object.keys(position).length > 0) {
      const options = {
        latitude: item.coordenada.lat,
        longitude: item.coordenada.lng,
        sourceLatitude: position.latitud,
        sourceLongitude: position.longitud,
        title: item.nombre,
        dialogTitle: '¿Cómo llegar?',
        dialogMessage: 'Elige la app de tu preferencia',
        cancelText: 'Cancelar',
      };
      return (
        <Popup
          isVisible={visiblePopover}
          onCancelPressed={() => setVisiblePopover(false)}
          onAppPressed={() => setVisiblePopover(false)}
          onBackButtonPressed={() => setVisiblePopover(false)}
          modalProps={{ animationIn: 'slideInUp' }}
          appsWhiteList={[]}
          options={options}
          style={{
            titleText: {
              color: '#002d72',
              fontSize: 16,
            },
            subtitleText: {
              color: '#686868',
              fontSize: 14,
            },
            itemText: {
              color: '#686868',
              fontSize: 14,
            },
            cancelButtonText: {
              color: '#00bdf2',
              fontSize: 16,
            },
          }}
        />
      );
    }
  };

  const RenderIcon = ({ props, name }) => (
    <Icon {...props} name={name} pack="font-awesome-5" />
  );

  const renderItem = ({ item, index }) => {
    return (
      <Card>
        <Row style={{ marginBottom: 10, marginTop: 10 }}>
          <Col size={3}>
            <Row>
              <Col size={1}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 22,
                    color: theme['color-basic-700'],
                  }}>
                  {item.dia}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: theme['color-basic-700'],
                  }}>
                  {item.mes}
                </Text>
              </Col>
              <Col size={3}>
                <Text style={{ color: theme['color-primary-600'] }}>
                  {item.nombre}
                </Text>
                <Text
                  category="c1"
                  style={{ marginTop: 5, color: theme['color-basic-600'] }}>
                  {item.ciudad} /{item.locacion}
                </Text>
                <Text
                  category="c1"
                  style={{ marginTop: 5, color: theme['color-basic-600'] }}>
                  Inicio: {item.horaInicio} hrs.
                </Text>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col>
                <Button
                  size="small"
                  accessoryLeft={props => (
                    <RenderIcon props={props} name="map-marker-alt" />
                  )}
                  status="info"
                  appearance="outline"
                  style={{ backgroundColor: '#fff', borderRadius: 20 }}
                  onPress={() => {
                    setVisiblePopover(true);
                  }}>
                  Como llegar
                </Button>
                {renderPopover(item)}
              </Col>

              <Col>
                <Button
                  size="small"
                  accessoryLeft={props => (
                    <RenderIcon props={props} name="share-alt" />
                  )}
                  status="info"
                  appearance="ghost"
                  onPress={() => {
                    shareInformation(
                      item.nombre,
                      item.locacion,
                      item.ciudad,
                      `${item.dia}-${item.mes}`,
                      item.tiket,
                    );
                  }}>
                  Compartir evento
                </Button>
              </Col>
            </Row>
          </Col>
          <Col
            onPress={() => {
              dispatch(clearEventDetails());
              navigation.navigate('EventDetailsAux', {
                url: item.detail,
                name: item.nombre,
              });
            }}
            size={1}
            style={{ marginRight: 15 }}>
            <FastImage
              style={{ height: 100, width: 100, borderRadius: 15 }}
              source={{
                uri: item.img,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Col>
        </Row>
      </Card>
    );
  };

  return <List renderItem={renderItem} data={data} />;
};

export default ListAssitsComponent;
