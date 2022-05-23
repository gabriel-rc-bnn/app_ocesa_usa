import React, { useRef, useEffect, useState } from 'react';
import { useForm } from '../../hooks';
import { useSelector, useDispatch } from 'react-redux';
import { Constants, Functions, Styles } from '../../utils';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { changePassword, clearMessagesLogin } from '../../redux/actions';
import { Container, Loading, ModalCard, ScrollView } from '../../components';
import { Button, Layout, Input, useTheme, Icon } from '@ui-kitten/components';

const { MESSAGES } = Constants;
const { validatePassword, focusTextInput, isEmpty, errorChangePassword } =
  Functions;

const ChangePasswordScreen = ({ navigation }) => {
  const theme = useTheme();

  const {
    password,
    newPassword,
    onChange,
    secureTextEntry,
    confirmedPassword,
  } = useForm({
    password: '',
    newPassword: '',
    confirmedPassword: '',
    secureTextEntry: true,
  });

  const [modal, setModal] = useState({
    text: undefined,
    visible: false,
    icon: undefined,
    title: undefined,
  });
  const [passwordError, setPasswordError] = useState();
  const [newPasswordError, setNewPasswordError] = useState();
  const [confirmedPwdError, setConfirmedPwdError] = useState();

  const passwordRef = useRef();
  const newPasswordRef = useRef();
  const confirmedPasswordRef = useRef();

  const renderIcon = props => (
    <TouchableWithoutFeedback
      onPress={() => onChange(!secureTextEntry, 'secureTextEntry')}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const dispatch = useDispatch();
  const changeData = useSelector(state => state.Login.data_change);
  const changeError = useSelector(state => state.Login.error_change);
  const changeSpinner = useSelector(state => state.Login.spinner_change);

  useEffect(() => {
    if (Object.keys(changeData).length > 0) {
      setModal({
        text: 'La contraseña ha sido cambiada correctamente',
        visible: true,
        icon: 'check-circle',
      });
      dispatch(clearMessagesLogin());
    } else if (changeError.error) {
      setModal({
        text: errorChangePassword(changeError.data.status),
        visible: true,
        icon: 'exclamation-circle',
      });
      dispatch(clearMessagesLogin());
    }
  }, [changeSpinner]);

  const handleChangePassword = () => {
    setConfirmedPwdError(undefined);
    setPasswordError(undefined);
    setNewPasswordError(undefined);

    if (!isEmpty([password, newPassword, confirmedPassword])) {
      if (!validatePassword(newPassword)) {
        setNewPasswordError(MESSAGES.password);
      } else if (newPassword !== confirmedPassword) {
        setConfirmedPwdError(MESSAGES.confirmedPassword);
      } else {
        dispatch(
          changePassword({
            password,
            newPassword,
          }),
        );
      }
    } else {
      if (isEmpty([password])) setPasswordError(MESSAGES.emptyField);
      if (isEmpty([newPassword])) setNewPasswordError(MESSAGES.emptyField);
      if (isEmpty([confirmedPassword]))
        setConfirmedPwdError(MESSAGES.emptyField);
    }
  };

  return (
    <Container
      withBar={{ colorBar: theme['color-primary-600'] }}
      withHeader={{
        backgroundColor: theme['color-primary-default'],
        title: 'Cambiar contraseña',
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => navigation.goBack(),
        },
      }}>
      <Layout style={Styles.container}>
        <Loading
          visible={changeSpinner}
          text="Sincronizando datos, por favor espere..."
        />
        <ModalCard
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: () => {
              setModal({ ...modal, visible: false });
            },
          }}
          dataIcon={{ name: modal.icon }}
          visible={modal.visible}
          title={modal.title}
          text={modal.text}
        />

        <ScrollView>
          <View>
            <Input
              size="large"
              status="info"
              value={password}
              ref={passwordRef}
              returnKeyType="next"
              autoComplete="password"
              caption={passwordError}
              label="Contrseña actual"
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              style={{ marginVertical: 5, marginTop: 15 }}
              onChangeText={value => onChange(value, 'password')}
              onSubmitEditing={() => focusTextInput(newPasswordRef)}
            />

            <Input
              size="large"
              status="info"
              value={newPassword}
              ref={newPasswordRef}
              returnKeyType="next"
              autoComplete="password"
              label="Nueva contraseña"
              caption={newPasswordError}
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              style={{ marginVertical: 5, marginTop: 25 }}
              onSubmitEditing={() => focusTextInput(confirmedPasswordRef)}
              onChangeText={value => {
                onChange(value, 'newPassword');

                if (!validatePassword(value)) {
                  setNewPasswordError(MESSAGES.password);
                } else {
                  setNewPasswordError(undefined);
                }
              }}
            />

            <Input
              size="large"
              status="info"
              returnKeyType="done"
              autoComplete="password"
              value={confirmedPassword}
              ref={confirmedPasswordRef}
              caption={confirmedPwdError}
              label="Confirmar contrseña"
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onSubmitEditing={Keyboard.dismiss}
              style={{ marginVertical: 5, marginTop: 25 }}
              onChangeText={value => {
                onChange(value, 'confirmedPassword');

                if (value !== newPassword) {
                  setConfirmedPwdError(MESSAGES.confirmedPassword);
                } else {
                  setConfirmedPwdError(undefined);
                }
              }}
            />

            <Button
              status="info"
              style={{ marginTop: 25 }}
              onPress={handleChangePassword}>
              Cambiar contraseña
            </Button>
          </View>
        </ScrollView>
      </Layout>
    </Container>
  );
};

export default ChangePasswordScreen;
