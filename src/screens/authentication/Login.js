import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useForm } from '../../hooks';
// import { trackEvent } from './../../services';
import FastImage from 'react-native-fast-image';
import * as FirebaseService from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { OcesaCitiBlanco } from '../../assets/img/logos';
import { FondoOcesa2 } from '../../assets/img/backgrounds';
import { login, clearMessagesLogin } from '../../redux/actions';
import { Constants, Functions, Colors, Styles } from '../../utils';
import { Button, Layout, Input, Icon } from '@ui-kitten/components';
import { Container, Loading, ModalCard, ScrollView } from '../../components';

const {
  isEmpty,
  validateEmail,
  focusTextInput,
  resetNavigation,
  loginErrorMessages,
} = Functions;
const { loginGray } = Colors;
const { deviceHeight, deviceWidth, MESSAGES, LOGIN_PLATFORM } = Constants;

const LoginScreen = ({ navigation }) => {
  const [modal, setModal] = useState(false);
  const [emailError, setEmailError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);

  const { email, password, onChange, modalText, secureTextEntry } = useForm({
    email: '',
    password: '',
    modalText: '',
    secureTextEntry: true,
  });

  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const loginData = useSelector(state => state.Login.data_login);
  const loginError = useSelector(state => state.Login.error_login);
  const loginSpinner = useSelector(state => state.Login.spinner_login);

  useEffect(() => {
    if (Object.keys(loginData).length > 0) {
      FirebaseService.initFCM();
      FirebaseService.initFA();

      // trackEvent('login', 'ocesa', 'exito');
      dispatch(clearMessagesLogin());

      if (loginData.profileTastes === true) {
        resetNavigation('Tastes', navigation);
      } else if (loginData.profileTastes === false) {
        resetNavigation('Dashboard', navigation);
      }
    } else if (loginError.error) {
      // trackEvent('login', 'ocesa', 'error');

      const message = loginErrorMessages(
        loginError.data.status,
        loginError.data,
        LOGIN_PLATFORM.ocesa,
      );
      setModal(true);
      onChange(message, 'modalText');
      dispatch(clearMessagesLogin());
    }
  }, [loginSpinner]);

  const handleLogin = async () => {
    setEmailError(undefined);
    setPasswordError(undefined);

    if (!isEmpty([email, password])) {
      if (validateEmail(email)) {
        dispatch(login(email, password));
      } else {
        setEmailError(MESSAGES.emailError);
      }
    } else {
      if (isEmpty([email])) setEmailError(MESSAGES.emptyField);
      if (isEmpty([password])) setPasswordError(MESSAGES.emptyField);
    }
  };

  const renderIcon = props => (
    <TouchableWithoutFeedback
      onPress={() => onChange(!secureTextEntry, 'secureTextEntry')}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Container
      withBar={{ colorBar: loginGray }}
      withHeader={{
        backgroundColor: loginGray,
        title: 'Ingresar',
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => navigation.goBack(),
        },
      }}>
      <Layout style={Styles.container}>
        <Loading visible={loginSpinner} text="Cargando..." />
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

        <FastImage style={styles.imageStyle} source={FondoOcesa2} />
        <FastImage
          style={{ ...styles.imageOcesa, ...Styles.imgLogoCiti }}
          source={OcesaCitiBlanco}
        />

        <ScrollView>
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Input
              size="large"
              value={email}
              ref={emailRef}
              status="control"
              caption={emailError}
              autoComplete="email"
              placeholder="Correo"
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="email-address"
              style={{ marginVertical: 5 }}
              onChangeText={value => onChange(value, 'email')}
              onSubmitEditing={() => focusTextInput(passwordRef)}
            />

            <Input
              size="large"
              status="control"
              value={password}
              ref={passwordRef}
              returnKeyType="done"
              caption={passwordError}
              autoComplete="password"
              placeholder="Contraseña"
              accessoryRight={renderIcon}
              style={{ marginVertical: 5 }}
              secureTextEntry={secureTextEntry}
              onSubmitEditing={() => Keyboard.dismiss()}
              onChangeText={value => onChange(value, 'password')}
            />

            <Button
              status="control"
              onPress={handleLogin}
              style={{ marginTop: 20, ...Styles.buttonAlignEnd }}>
              Ingresar
            </Button>

            <Button
              status="control"
              appearance="ghost"
              style={{ ...Styles.buttonAlignEnd }}
              onPress={() => navigation.navigate('RecoveryPassword')}>
              ¿Olvidaste tu contraseña?
            </Button>

            <View style={{ height: 100 }} />
          </View>
        </ScrollView>
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
  imageOcesa: {
    alignSelf: 'flex-end',
    marginTop: -30,
  },
});

export default LoginScreen;
