import React, { useRef, useEffect, useState } from 'react';
// import { trackEvent } from './../../services';
import FastImage from 'react-native-fast-image';
import * as FirebaseService from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { OcesaCitiBlanco } from '../../assets/img/logos';
import { View, Keyboard, StyleSheet } from 'react-native';
import { FondoOcesa2 } from '../../assets/img/backgrounds';
import { Constants, Functions, Colors, Styles } from '../../utils';
import { Button, Layout, Input, Text } from '@ui-kitten/components';
import { recoveryPassword, clearMessagesLogin } from '../../redux/actions';
import { Container, Loading, ModalCard, ScrollView } from '../../components';

const { isEmpty, validateEmail, resetNavigation } = Functions;

const { loginGray } = Colors;
const { deviceHeight, deviceWidth, MESSAGES } = Constants;

const RecoveryPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [emailError, setEmailError] = useState(undefined);

  const dispatch = useDispatch();
  const recoveryData = useSelector(state => state.Login.data_recovery);
  const recoveryError = useSelector(state => state.Login.error_recovery);
  const recoverySpinner = useSelector(state => state.Login.spinner_recovery);

  useEffect(() => {
    if (Object.keys(recoveryData).length > 0) {
      // trackEvent('login', 'recuperarContraseña', 'exito');
      FirebaseService.logEvent(FirebaseService.eventName.recoveryPassword);
      setModalSuccess(true);

      dispatch(clearMessagesLogin());
    } else if (recoveryError.error) {
      // trackEvent('login', 'recuperarContraseña', 'error');

      setModalError(true);
      dispatch(clearMessagesLogin());
    }
  }, [recoverySpinner]);

  const handleRecoveryPassword = async () => {
    setEmailError(undefined);

    if (!isEmpty([email])) {
      if (validateEmail(email)) {
        dispatch(recoveryPassword(email));
      } else {
        setEmailError(MESSAGES.emailError);
      }
    } else {
      setEmailError(MESSAGES.emptyField);
    }
  };

  return (
    <Container
      withBar={{ colorBar: loginGray }}
      withHeader={{
        backgroundColor: loginGray,
        title: 'Recuperar contraseña',
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => navigation.goBack(),
        },
      }}>
      <Layout style={Styles.container}>
        <Loading
          visible={recoverySpinner}
          text="Enviando, por favor espera..."
        />
        <ModalCard
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: () => {
              setModalSuccess(false);
              resetNavigation('Menu', navigation);
            },
          }}
          dataIcon={{ name: 'envelope' }}
          text={MESSAGES.emailSend}
          title="Correo enviado"
          visible={modalSuccess}
        />
        <ModalCard
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: () => setModalError(false),
          }}
          dataIcon={{ name: 'exclamation-circle' }}
          text={MESSAGES.emailNotExists}
          title="¡Error!"
          visible={modalError}
        />

        <FastImage style={styles.imageStyle} source={FondoOcesa2} />
        <FastImage
          style={{ ...styles.imageOcesa, ...Styles.imgLogoCiti }}
          source={OcesaCitiBlanco}
        />

        <ScrollView>
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text category="label" status="control">
              ¿Olvidaste tu contraseña?
            </Text>
            <Text status="control" style={styles.textStyle}>
              Confirma tu correo y te enviaremos un mensaje con los pasos para
              recuperar tu contraseña.
            </Text>

            <Input
              size="large"
              value={email}
              status="control"
              caption={emailError}
              autoComplete="email"
              autoCapitalize="none"
              onChangeText={setEmail}
              keyboardType="email-address"
              style={{ marginVertical: 5 }}
              placeholder="usuario@correo.com"
              onSubmitEditing={Keyboard.dismiss}
            />

            <Button
              status="control"
              onPress={handleRecoveryPassword}
              style={{ marginTop: 20, ...Styles.buttonAlignEnd }}>
              Recuperar contraseña
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
  textStyle: {
    textAlign: 'justify',
    marginVertical: 20,
    fontSize: 16,
  },
});

export default RecoveryPasswordScreen;
