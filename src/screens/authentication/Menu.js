import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import * as FirebaseService from '../../firebase';
import { OcesaCiti } from '../../assets/img/logos';
import { useSelector, useDispatch } from 'react-redux';
import { FondoOcesa } from '../../assets/img/backgrounds';
import { Constants, Styles, Functions } from '../../utils';
import { GraphRequestManager } from 'react-native-fbsdk-next';
import { Container, Loading, ModalCard } from '../../components';
import { loginFB, clearMessagesLogin } from '../../redux/actions';
import { handleLoginFacebook, infoRequest } from './../../services';
import { Button, Layout, useTheme, Icon, Text } from '@ui-kitten/components';
import appleAuth, {
  AppleButton,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
  AppleAuthError,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';
import { Platform, Dimensions } from 'react-native';

const { deviceHeight, deviceWidth, MESSAGES, LOGIN_PLATFORM } = Constants;
const { loginErrorMessages, resetNavigation } = Functions;

const MenuScreen = ({ navigation }) => {
  const theme = useTheme();
  const [share, setShare] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalTerms, setModalTerms] = useState(false);
  const [modalShare, setModalShare] = useState(false);
  const [modalTermsIOS, setModalTermsIOS] = useState(false);
  const [modalShareIOS, setModalShareIOS] = useState(false);

  const dispatch = useDispatch();
  const loginFbData = useSelector(state => state.Login.data_fb);
  const loginFbError = useSelector(state => state.Login.error_fb);
  const loginFbSpinner = useSelector(state => state.Login.spinner_fb);

  useEffect(() => {
    if (Object.keys(loginFbData).length > 0) {
      FirebaseService.initFCM();
      FirebaseService.initFA();

      // trackEvent('login', 'facebook', 'exito');
      dispatch(clearMessagesLogin());

      if (loginFbData.profileTastes === true) {
        resetNavigation('Tastes', navigation);
      } else if (loginFbData.profileTastes === false) {
        resetNavigation('Dashboard', navigation);
      }
    } else if (loginFbError.error) {
      // trackEvent('login', 'facebook', 'error');

      const message = loginErrorMessages(
        loginFbError.data.status,
        loginFbError.data,
        LOGIN_PLATFORM.facebook,
      );
      setModal(true);
      setModalText(message);
      dispatch(clearMessagesLogin());
    }
  }, [loginFbSpinner]);

  const handleFacebook = async () => {
    const response = await handleLoginFacebook();

    if (response.status === 200) {
      const token = response.data.token.accessToken;

      new GraphRequestManager()
        .addRequest(
          infoRequest(token, (error, result) =>
            responseCallback(error, result, token),
          ),
        )
        .start();
    }
  };

  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // // TODO: Backend Peticion
      // alert('Hi')
      // Alert.alert('Error');
      // // const auth = await
      // alert(appleAuthRequestResponse.authorizationCode)
      // console.log(appleAuthRequestResponse.email);
      // console.log(appleAuthRequestResponse.fullName)
      // console.log(appleAuthRequestResponse.authorizationCode);
      FirebaseService.initFCM(true);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.log(error);
      // Alert.alert('Error');
    }
  };

  const renderAppleButton = () => {
    if (Platform.OS === 'ios' && parseFloat(Platform.Version) >= 13) {
      return (
        <AppleButton
          buttonType={AppleButton.Type.SIGN_UP}
          style={[Styles.buttonAlignEnd, { height: 42 }]}
          onPress={() => setModalTermsIOS(true)}
        />
      );
    }

    return null;
  };

  const responseCallback = async (error, result, token) => {
    try {
      if (error) {
        setModalText(MESSAGES.errorLoginFB);
        setModal(true);
      } else {
        dispatch(loginFB(token, result.email, share));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const TextTerms = () => (
    <Text style={{ color: theme['color-basic-600'], ...styles.textStyle }}>
      Al continuar con el proceso de registro vía Facebook estás aceptando los{' '}
      <Text
        style={{
          color: theme['color-basic-600'],
          textDecorationLine: 'underline',
        }}
        onPress={() => {
          navigation.navigate('Dashboard', {
            screen: 'TermsAndConditions',
            params: { label: 'Términos y condiciones' },
          });
          setModalTerms(false);
        }}>
        Términos y condiciones
      </Text>{' '}
      así como el{' '}
      <Text
        style={{
          color: theme['color-basic-600'],
          textDecorationLine: 'underline',
        }}
        onPress={() => {
          navigation.navigate('Dashboard', {
            screen: 'NoticePrivacy',
            params: { label: 'Aviso de privacidad' },
          });
          setModalTerms(false);
        }}>
        Aviso de privacidad
      </Text>
    </Text>
  );

  const TextTermsIOS = () => (
    <Text style={{ color: theme['color-basic-600'], ...styles.textStyle }}>
      Al continuar con el proceso de registro vía Apple ID estás aceptando los{' '}
      <Text
        style={{
          color: theme['color-basic-600'],
          textDecorationLine: 'underline',
        }}
        onPress={() => {
          navigation.navigate('Dashboard', {
            screen: 'TermsAndConditions',
            params: { label: 'Términos y condiciones' },
          });
          setModalTerms(false);
        }}>
        Términos y condiciones
      </Text>{' '}
      así como el{' '}
      <Text
        style={{
          color: theme['color-basic-600'],
          textDecorationLine: 'underline',
        }}
        onPress={() => {
          navigation.navigate('Dashboard', {
            screen: 'NoticePrivacy',
            params: { label: 'Aviso de privacidad' },
          });
          setModalTerms(false);
        }}>
        Aviso de privacidad
      </Text>
    </Text>
  );

  const FbIcon = props => {
    props.style.tintColor = theme['color-primary-default'];
    return <Icon {...props} name="facebook-square" pack="font-awesome-5" />;
  };

  return (
    <Container
      withBar={{ themeBar: 'dark', colorBar: theme['color-basic-100'] }}>
      <Layout style={Styles.container}>
        <FastImage style={styles.imageStyle} source={FondoOcesa} />
        <Loading
          visible={loginFbSpinner}
          text="Iniciando sesión, por favor espera..."
        />

        <ModalCard
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: () => setModal(false),
          }}
          dataIcon={{ name: 'exclamation-circle' }}
          text={modalText}
          title="¡Error!"
          visible={modal}
        />

        <ModalCard
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: () => {
              setModalTerms(false);
              setModalShare(true);
            },
          }}
          dataBtnLeft={{
            text: 'Cancelar',
            onPress: () => setModalTerms(false),
          }}
          dataIcon={{ name: 'facebook' }}
          TextComponent={TextTerms}
          visible={modalTerms}
        />

        <ModalCard
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: () => {
              setShare(true);
              setModalShare(false);
              handleFacebook();
            },
          }}
          dataBtnLeft={{
            text: 'Omitir',
            onPress: () => {
              setModalShare(false);
              handleFacebook();
            },
          }}
          dataIcon={{ name: 'share' }}
          text={MESSAGES.authorizationData}
          visible={modalShare}
          textStyle={{ textAlign: 'justify' }}
        />

        <ModalCard
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: () => {
              setModalTermsIOS(false);
              setModalShareIOS(true);
            },
          }}
          dataBtnLeft={{
            text: 'Cancelar',
            onPress: () => setModalTermsIOS(false),
          }}
          dataIcon={{ name: 'apple' }}
          TextComponent={TextTermsIOS}
          visible={modalTermsIOS}
        />

        <ModalCard
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: async () => {
              setShare(true);
              setModalShareIOS(false);
              await onAppleButtonPress();
            },
          }}
          dataBtnLeft={{
            text: 'Omitir',
            onPress: async () => {
              setModalShareIOS(false);
              await onAppleButtonPress();
            },
          }}
          dataIcon={{ name: 'share' }}
          text={MESSAGES.authorizationData}
          visible={modalShareIOS}
          textStyle={{ textAlign: 'justify' }}
        />

        <View style={styles.menuContainer}>
          <FastImage style={styles.imageOcesa} source={OcesaCiti} />

          <TouchableOpacity
            status="basic"
            style={Styles.buttonAlignEnd}
            title = 'Ingresar'
            onPress={() => navigation.navigate('Login')}>
            <Text style={{color: 'black'}}>Ingresar</Text>
          </TouchableOpacity>


          <TouchableOpacity
            status="basic"
            style={Styles.buttonAlignEnd}
            onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={{color: 'black'}}>Crear cuenta</Text>
          </TouchableOpacity>

          {renderAppleButton()}

          <TouchableOpacity
            status="basic"
            accessoryLeft={FbIcon}
            onPress={() => setModalTerms(true)}
            style={Styles.buttonAlignEnd}>
            <Text style={{color: 'black'}}>Ingresar con Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            status="basic"
            style={Styles.buttonAlignEnd}
            onPress={async () => {
              await FirebaseService.initFCM(true);
              await FirebaseService.logEvent(FirebaseService.eventName.guest);
              navigation.navigate('Dashboard');
            }}>
            <Text style={{color: 'black'}}>Ingresar como invitado</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: deviceHeight,
    width: deviceWidth,
    position: 'absolute',
  },
  menuContainer: {
    flex: 1,
    top: -60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOcesa: {
    width: 438 / 1.6,
    height: 199 / 1.6,
    marginBottom: 20,
  },
  textStyle: {
    marginTop: 10,
    textAlign: 'justify',
  },
});

export default MenuScreen;
