import React, { useEffect, useState } from 'react';
import {
  Text,
  Button,
  Layout,
  useTheme,
  CheckBox,
} from '@ui-kitten/components';
import {
  Styles,
  RemoveAll,
  UserCache,
  Constants,
  Functions,
  MenuSettings,
  PlatformCache,
  MenuSettingsLogin,
  Colors,
} from '../../utils';
import { LoginManager } from 'react-native-fbsdk-next';
import { useDispatch, useSelector } from 'react-redux';
import { saveShareData, resetRedux } from '../../redux/actions';
import { Container, MenuCollections, ModalCard } from '../../components';

const { LOGIN_PLATFORM } = Constants;
const { resetNavigation } = Functions;

const SettingsScreen = ({ navigation }) => {
  const theme = useTheme();

  const [modal, setModal] = useState({
    text: undefined,
    visible: false,
    icon: undefined,
    title: undefined,
  });
  const [token, setToken] = useState(false);

  const dispatch = useDispatch();
  const msiCatalogData = useSelector(
    state => state.Search.load_msi_catalog_success,
  );
  const saveSpinner = useSelector(
    state => state.Tastes.show_save_share_data_spinner,
  );

  useEffect(() => {
    const Validate = async () => {
      if ((await UserCache.getToken()) !== null) {
        setToken(true);
      } else {
        setToken(false);
      }
    };

    Validate();

    if (msiCatalogData.length > 0) {
      msiCatalogData.forEach((item, index) => {
        const withToken = MenuSettings.filter(
          item2 => item2.label === item.name,
        );
        const withoutToken = MenuSettingsLogin.filter(
          item2 => item2.label === item.name,
        );

        if (index < 4 && withToken.length < 1 && withoutToken.length < 1) {
          MenuSettings.push({
            route: 'MSI',
            label: item.name,
            background: index % 2 === 0 ? '#F5F2F3' : undefined,
            disabled: false,
            data: {
              data: item.description,
              label: item.name,
            },
          });

          MenuSettingsLogin.push({
            route: 'MSI',
            label: item.name,
            background: index % 2 === 0 ? '#F5F2F3' : undefined,
            disabled: false,
            data: {
              data: item.description,
              label: item.name,
            },
          });
        }
      });
    }
  }, [saveSpinner]);

  const useCheckboxState = (initialCheck = false) => {
    const [checked, setChecked] = useState(initialCheck);

    const onChange = () => {
      if (checked) {
        setChecked(false);
        dispatch(saveShareData(false));
      } else {
        setChecked(true);
        setModal({
          text: '¿Desea compartir sus datos con terceros?',
          visible: true,
          icon: 'exclamation-circle',
        });
      }
    };

    return { checked, onChange };
  };

  const primaryCheckboxState = useCheckboxState();

  return (
    <Container
      withBar={{ themeBar: 'light', colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-500'],
        title: 'Configuraciones',
        align: 'center',
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => navigation.goBack(),
        },
      }}>
      <ModalCard
        dataBtnRigth={{
          text: 'Aceptar',
          onPress: () => {
            setModal({ ...modal, visible: false });
            dispatch(saveShareData(true));
          },
        }}
        dataBtnLeft={{
          text: 'Cancelar',
          onPress: () => {
            setModal({ ...modal, visible: false });
            dispatch(saveShareData(false));
          },
        }}
        dataIcon={{ name: modal.icon }}
        visible={modal.visible}
        title={modal.title}
        text={modal.text}
      />
      <Layout style={Styles.container}>
        <Text
          category="s2"
          style={{
            textAlign: 'center',
            marginBottom: 20,
          }}>
          En esta sección encontrarás las opciones de configuración para tu
          cuenta OCESA App.
        </Text>

        {token ? (
          <Layout>
            <MenuCollections navigation={navigation} data={MenuSettingsLogin} />

            <CheckBox
              status="info"
              {...primaryCheckboxState}
              style={{ marginTop: 20 }}>
              Autorizo la transferencia de mis datos personales a terceros
            </CheckBox>

            <Button
              status="info"
              onPress={async () => {
                if (
                  (await PlatformCache.getLoginPlatform()) ===
                  LOGIN_PLATFORM.facebook
                ) {
                  LoginManager.logOut();
                }
                await RemoveAll();
                dispatch(resetRedux());
                resetNavigation('Auth', navigation);
              }}
              style={{ marginTop: 25 }}>
              Cerrar Sesión
            </Button>
          </Layout>
        ) : (
          <Layout>
            <MenuCollections navigation={navigation} data={MenuSettings} />
            <Button
              status="info"
              onPress={() => navigation.navigate('Auth')}
              style={{ marginTop: 25 }}>
              Iniciar Sesión
            </Button>
          </Layout>
        )}

        <Text
          category="p2"
          style={{
            alignSelf: 'flex-end',
            marginTop: 20,
            fontSize: 14,
            color: Colors.textColorGray,
          }}>
          Versión {Constants.APP_VERSION}
        </Text>
      </Layout>
    </Container>
  );
};

export default SettingsScreen;
