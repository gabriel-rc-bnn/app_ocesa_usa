import React, { useState } from 'react';
import { Text, List, Card, Icon, useTheme } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';
import { Col, Row } from 'react-native-easy-grid';
import { TouchableOpacity, View } from 'react-native';
import { getDetailEvet } from '../services/connectApi/Events';
import { deleteMyEventInterest, clearEventDetails } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { ModalCard } from '.';

const ListFavoritesComponent = ({ data, navigation }) => {
  const theme = useTheme();
  const [modal, setmodal] = useState({
    visible: false,
    text: undefined,
    title: undefined,
    icon: { name: '' },
  });

  const dispatch = useDispatch();
  const getInfo = async info => {
    return navigation.navigate('EventDetailsAux', { url: info });
  };

  let godata = data;
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <ModalCard
          visible={modal.visible}
          dataIcon={modal.icon}
          title={modal.title}
          text={modal.text}
          dataBtnLeft={{
            text: 'Cancelar',
            onPress: () => setmodal({ ...modal, visible: false }),
          }}
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: () => {
              setmodal({ ...modal, visible: false });
              dispatch(deleteMyEventInterest(item.id, item.seo));
              godata.splice(index, 1);
            },
          }}
        />
        <Card>
          <Row style={{ marginBottom: 15, marginTop: 15 }}>
            <Col size={3}>
              <Text style={{ color: theme['color-primary-600'] }}>
                {item.nombre}
              </Text>
              <Text
                category="c1"
                style={{ marginTop: 5, color: theme['color-basic-600'] }}>
                Consultar más información sobre el evento
              </Text>
              <Col>
                <TouchableOpacity
                  onPress={() =>
                    setmodal({
                      visible: true,
                      text: '¿Desea eliminar este evento de favoritos?',
                      title: 'Atención',
                      icon: { name: 'exclamation-circle' },
                    })
                  }>
                  <Icon
                    name="heart"
                    pack="font-awesome-5"
                    solid
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: theme['color-danger-default'],
                    }}
                  />
                </TouchableOpacity>
              </Col>
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
      </View>
    );
  };

  return <List renderItem={renderItem} data={godata} />;
};

export default ListFavoritesComponent;
