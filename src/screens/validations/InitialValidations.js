import React, { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { BackHandler } from 'react-native';
import { checkVersion, deleteDevice, getProfile } from '../../services';
import * as FirebaseService from '../../firebase';
import { Styles, Functions, UserCache, DeviceCache } from '../../utils';
import NetInfo from '@react-native-community/netinfo';
import VersionCheck from 'react-native-version-check';
import { Layout, useTheme } from '@ui-kitten/components';
import { Loading, Container, ModalCard } from '../../components';

const { OpenURLButton } = Functions;

const InitialValidationsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [modalNewVersion, setModalNewVersion] = useState(false);
  const [modalSessionExp, setModalSessionExp] = useState(false);
  const [modalUpdateVersion, setModalUpdateVersion] = useState(false);
  const [modalWithoutConnection, setModalWithoutConnection] = useState();
  const [modalError, setModalError] = useState({ visible: false, error: '' });
  const { APP_STORE_ID } = Config;

  const theme = useTheme();

  useEffect(() => {
    fetchData();
  }, [modalWithoutConnection]);

  const handleUpdateApp = async () => {
    const link = await VersionCheck.getStoreUrl({
      appID: APP_STORE_ID,
    });
    OpenURLButton(link);
    BackHandler.exitApp();
  };

  async function fetchData() {
    setLoading(true);

    NetInfo.addEventListener(state => {
      //setModalWithoutConnection(state.isInternetReachable);
    });

    if (modalWithoutConnection) {
      const response = await checkVersion();

      setTimeout(() => {
        setLoading(false);

        if (response?.error) {
          setModalError({ visible: true, error: response?.error });
        } else if (response?.newVersion) {
          setModalNewVersion(true);
        } else if (response?.updateVersion) {
          setModalUpdateVersion(true);
        } else {
          getDataUser();
        }
      }, 1000);
    } else {
      setLoading(false);
      getDataUser();
    }
  }

  function getDataUser() {
    UserCache.getUser().then(user => {
      if (!user.error) {
        DeviceCache.getGuestId().then(
          async () => await FirebaseService.initFA(),
        );

        getProfile()
          .then(async () => {
            await FirebaseService.initFCM(true);
            navigation.navigate('Dashboard');
          })
          .catch(async () => {
            setModalSessionExp(true);

            await deleteDevice().catch(error => {
              if (error.response)
                console.log('http error deleteDevice:', error.response);
              else console.log('error deleteDevice:', error);
            });

            UserCache.removeAll().then(() => {
              DeviceCache.removeDeviceId().then(async () => {
                await FirebaseService.initFA();
              });
            });
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        navigation.navigate('Auth');
        setLoading(false);
      }
    });
  }

  return (
    <Container>
      <Layout style={Styles.container}>
        <Loading
          visible={loading}
          statusText="primary"
          barStyle="dark"
          backdropColor={theme['color-basic-100']}
          colorSpinner={theme['color-info-default']}
        />
        <ModalCard
          dataBtnLeft={{
            text: 'Salir',
            onPress: () => BackHandler.exitApp(),
          }}
          dataBtnRigth={{
            text: 'Continuar',
            status: 'danger',
            onPress: () => setModalError({ visible: false, error: '' }),
          }}
          dataIcon={{
            name: 'exclamation-circle',
            type: 'font-awesome-5',
            color: theme['color-danger-default'],
          }}
          title="¡Error!"
          text={
            'Hubo un error al validar nuevas actualizaciones: ' +
            modalError.error
          }
          visible={modalError.visible}
        />

        <ModalCard
          dataBtnLeft={{
            text: 'Ahora no',
            onPress: () => setModalNewVersion(false),
          }}
          dataBtnRigth={{
            text: 'Actualizar',
            onPress: handleUpdateApp,
          }}
          dataIcon={{
            name: 'system-update',
            type: 'material',
          }}
          title="¡Nueva versión!"
          text="Por favor, actualiza la aplicación de OCESA a la brevedad posible. De lo contrario, puede que la aplicación no funcione correctamente."
          visible={modalNewVersion}
        />

        <ModalCard
          dataBtnRigth={{
            text: 'Actualizar',
            status: 'danger',
            onPress: handleUpdateApp,
          }}
          dataIcon={{
            name: 'system-update',
            type: 'material',
            color: theme['color-danger-default'],
          }}
          title="¡Actualizar versión!"
          text="Por favor, actualiza a nuestra última versión para poder seguir disfrutando de todos los eventos que tenemos para ti."
          visible={modalUpdateVersion}
        />

        <ModalCard
          dataBtnLeft={{
            text: 'Salir',
            onPress: () => BackHandler.exitApp(),
          }}
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: () => navigation.navigate('Auth'),
          }}
          dataIcon={{
            name: 'user-clock',
          }}
          title="¡Sesión expirada!"
          text="Vuelve a iniciar sesión por favor."
          visible={modalSessionExp}
        />

        <ModalCard
          dataBtnRigth={{
            text: 'Cerrar',
            status: 'danger',
            onPress: () => setModalWithoutConnection(false),
          }}
          dataIcon={{
            name: 'wifi-off',
            type: 'material',
            color: theme['color-danger-default'],
          }}
          title="¡Sin conexión!"
          text="Revisa tu conexión a internet para seguir disfrutando de todos los eventos que tenemos para ti."
          visible={!modalWithoutConnection}
        />
      </Layout>
    </Container>
  );
};

export default InitialValidationsScreen;
