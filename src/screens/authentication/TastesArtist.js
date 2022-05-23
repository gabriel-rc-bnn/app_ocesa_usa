import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Constants, Styles } from '../../utils';
import { Button, Text, useTheme } from '@ui-kitten/components';
import { Container, ModalCard, TastesArtistMatrix } from '../../components';

const TastesArtistScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [modal, setModal] = useState({
    visible: false,
    text: undefined,
    title: undefined,
    icon: undefined,
  });
  const [activeItems, setActiveItems] = useState([]);

  const handleArtists = () => {
    if (activeItems.length >= 5) {
      navigation.navigate('ResultTastes', {
        artists: activeItems.filter(item => item.selected === true),
      });
    } else {
      setModal({
        visible: true,
        icon: 'exclamation-circle',
        text: Constants.MESSAGES.insuficientArtist,
      });
    }
  };

  return (
    <Container
      backgroundColor={theme['color-basic-100']}
      withBar={{ colorBar: theme['color-basic-100'], themeBar: 'dark' }}
      withHeader={{
        backgroundColor: theme['color-basic-100'],
        title: 'Perfilador',
        color: theme['text-basic-color'],
        accessoryLeft: {
          name: 'arrow-back',
          color: theme['text-basic-color'],
          onPress: () => navigation.goBack(),
        },
      }}>
      <View style={Styles.container}>
        <ModalCard
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: () =>
              setModal({
                icon: undefined,
                text: undefined,
                title: undefined,
                visible: false,
              }),
          }}
          dataIcon={{ name: modal.icon }}
          text={modal.text}
          title={modal.title}
          visible={modal.visible}
        />

        <View style={Styles.alignCenter}>
          <Text category="h4">Resultado</Text>
          <Text style={{ marginVertical: 10, textAlign: 'center' }}>
            Elige a tus artistas o eventos favoritos
          </Text>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <TastesArtistMatrix
            setActiveItems={setActiveItems}
            activeItems={activeItems}
            genres={route.params.data}
          />
        </ScrollView>

        <View
          style={[
            Styles.containerModal,
            { margin: -20, position: 'relative' },
          ]}>
          <Button onPress={handleArtists}>Continuar</Button>

          <Button
            appearance="ghost"
            status="control"
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate('Dashboard')}>
            {() => (
              <Text
                category="s2"
                status="control"
                style={{ textDecorationLine: 'underline' }}>
                Ir al inicio
              </Text>
            )}
          </Button>
        </View>

        {/* <RenderGenres /> */}
        {/* <Content
          scrollEnabled={false}
          contentContainerStyle={{
            backgroundColor: '#fff',
            flex: 1,
          }}>
          <Text style={[titleH1, { textAlign: 'center', marginTop: 30 }]}>
            Resultado
          </Text>
          <Text style={[titleH4, { textAlign: 'center', marginVertical: 10 }]}>
            Elige a tus artistas o eventos favoritos
          </Text>
          <View style={{ padding: 20, paddingBottom: 220 }}>
            <ScrollView>
              <TastesArtistMatrix
                activeItems={this.state.activeItems}
                genres={this.props.navigation.state.params}
              />
            </ScrollView>
          </View>

          <View style={containerFixed}> */}
        {/* <Button */}
        {/* onPress={() => this.handleArtists(this.state.activeItems)} > */}
        {/* Continuar
        </Button> */}
        {/* </View>
        </Content> */}
      </View>
    </Container>
  );
};

export default TastesArtistScreen;
