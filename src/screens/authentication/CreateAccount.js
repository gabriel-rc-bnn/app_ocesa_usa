import React, { useRef, useEffect, useState } from 'react';
import {
  Colors,
  Styles,
  States,
  Countries,
  Constants,
  Functions,
} from '../../utils';
import {
  View,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Icon,
  Text,
  Input,
  Button,
  Layout,
  Select,
  CheckBox,
  SelectItem,
  Datepicker,
} from '@ui-kitten/components';
import { useForm } from '../../hooks';
// import { trackEvent } from './../../services';
import FastImage from 'react-native-fast-image';
import * as FirebaseService from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { OcesaCitiBlanco } from '../../assets/img/logos';
import { FondoOcesa2 } from '../../assets/img/backgrounds';
import { signUp, resetRedux, clearMessagesLogin } from '../../redux/actions';
import { Container, Loading, ModalCard, ScrollView } from '../../components';
const {
  isEmpty,
  calcularEdad,
  validateEmail,
  focusTextInput,
  formatBirthday,
  resetNavigation,
  validatePassword,
  signUpErrorMessages,
} = Functions;

const { loginGray } = Colors;
const { deviceHeight, deviceWidth, GENDERS, MESSAGES } = Constants;

const CreateAccountScreen = ({ navigation }) => {
  let fechaMax = new Date(); // Fecha mínima para registro
  fechaMax.setMonth(fechaMax.getMonth() - 156);

  const [modal, setModal] = useState(false);
  const [nameError, setNameError] = useState();
  const [cityError, setCityError] = useState();
  const [stateError, setStateError] = useState();
  const [emailError, setEmailError] = useState();
  const [genderError, setGenderError] = useState();
  //const [countryError, setCountryError] = useState();
  const [birthdayError, setBirthdayError] = useState();
  const [lastNameError, setLastNameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [validateAge, setValidateAge] = useState(false);
  const [parentNameError, setParentNameError] = useState();
  const [parentPhoneError, setParentPhoneError] = useState();
  const [confirmedPwdError, setConfirmedPwdError] = useState();

  const {
    name,
    city,
    email,
    birthday,
    lastName,
    password,
    onChange,
    modalText,
    parentName,
    stateIndex,
    parentPhone,
    genderIndex,
    // countryIndex,
    transferData,
    consentParent,
    termsAndPolicy,
    secureTextEntry,
    confirmedPassword,
  } = useForm({
    name: '',
    city: '',
    email: '',
    birthday: '',
    lastName: '',
    password: '',
    modalText: '',
    parentName: '',
    stateIndex: '',
    parentPhone: '',
    genderIndex: '',
    transferData: false,
    consentParent: false,
    termsAndPolicy: false,
    confirmedPassword: '',
    secureTextEntry: true,
    // countryIndex: new IndexPath(149),
  });

  const nameRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const emailRef = useRef();
  const genderRef = useRef();
  // const countryRef = useRef();
  const birthdayRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const parentNameRef = useRef();
  const parentPhoneRef = useRef();
  const confirmedPasswordRef = useRef();

  const gender = GENDERS[genderIndex.row];
  const state = States.map(item => item.name)[stateIndex.row];
  // const country = Countries.map(item => item.name)[countryIndex.row];

  const dispatch = useDispatch();
  const signupData = useSelector(state => state.Login.data_sign_up);
  const signupError = useSelector(state => state.Login.error_sign_up);
  const signupSpinner = useSelector(state => state.Login.spinner_sign_up);

  useEffect(() => {
    if (Object.keys(signupData).length > 0) {
      // trackEvent('login', 'registro', 'exito');

      FirebaseService.logEvent(FirebaseService.eventName.signUp, {
        exito: true,
      });

      onChange(MESSAGES.createAccount, 'modalText');
      setModal(true);

      dispatch(resetRedux());
      dispatch(clearMessagesLogin());

      resetNavigation('Menu', navigation);
    } else if (signupError.error) {
      // trackEvent('login', 'registro', 'error');

      FirebaseService.logEvent(FirebaseService.eventName.signUp, {
        exito: false,
      });

      const message = signUpErrorMessages(signupError.data.status, email);

      onChange(message, 'modalText');
      setModal(true);
      dispatch(clearMessagesLogin());
    }
  }, [signupSpinner]);

  const handleCreateAccount = () => {
    console.log(password !== confirmedPassword);
    setNameError(undefined);
    setCityError(undefined);
    setStateError(undefined);
    setEmailError(undefined);
    setGenderError(undefined);
    setBirthdayError(undefined);
    setLastNameError(undefined);
    setPasswordError(undefined);
    setParentNameError(undefined);
    setParentPhoneError(undefined);
    setConfirmedPwdError(undefined);

    let adult = validateAge && !consentParent ? '' : 'sí';

    if (
      !isEmpty([
        name,
        city,
        email,
        adult,
        state,
        gender,
        birthday,
        lastName,
        password,
        confirmedPassword,
      ])
    ) {
      if (validateEmail(email)) {
        if (!validatePassword(password)) {
          setPasswordError(MESSAGES.password);
        } else if (password !== confirmedPassword) {
          setConfirmedPwdError(MESSAGES.confirmedPassword);
        } else {
          if (!validateAge) {
            dispatch(
              signUp({
                name,
                city,
                state,
                email,
                password,
                lastName,
                transferData,
                country: 'México',
                gender: gender[0],
                countryCode: 'MX',
                birthday: formatBirthday(birthday),
                stateCode: States.map(item => item.ref_id)[stateIndex.row],
              }),
            );
          } else {
            if (consentParent) {
              dispatch(
                signUp({
                  name,
                  city,
                  state,
                  email,
                  password,
                  lastName,
                  parentName,
                  parentPhone,
                  transferData,
                  consentParent,
                  country: 'México',
                  gender: gender[0],
                  countryCode: 'MX',
                  birthday: formatBirthday(birthday),
                  stateCode: States.map(item => item.ref_id)[stateIndex.row],
                }),
              );
            }
          }
        }
      } else {
        setEmailError(MESSAGES.emailError);
      }
    } else {
      if (isEmpty([name])) setNameError(MESSAGES.emptyField);
      if (isEmpty([city])) setCityError(MESSAGES.emptyField);
      if (isEmpty([email])) setEmailError(MESSAGES.emptyField);
      if (isEmpty([state])) setStateError(MESSAGES.emptyField);
      if (isEmpty([gender])) setGenderError(MESSAGES.emptyField);
      if (isEmpty([birthday])) setBirthdayError(MESSAGES.emptyField);
      if (isEmpty([lastName])) setLastNameError(MESSAGES.emptyField);
      if (isEmpty([password])) setPasswordError(MESSAGES.emptyField);

      if (validateAge) {
        if (isEmpty([parentName])) setParentNameError(MESSAGES.emptyField);
        if (isEmpty([parentPhone])) setParentPhoneError(MESSAGES.emptyField);
      }
    }
  };

  const propsStyle = props => ({
    ...props.style,
    textDecorationLine: 'underline',
  });

  const renderIcon = props => (
    <TouchableWithoutFeedback
      onPress={() => onChange(!secureTextEntry, 'secureTextEntry')}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const TermsAndPolicy = () => (
    <View style={{ marginTop: 10 }}>
      {validateAge && (
        <CheckBox
          status="control"
          checked={consentParent}
          style={{ marginVertical: 5 }}
          disabled={isEmpty([parentName, parentPhone])}
          onChange={value => onChange(value, 'consentParent')}>
          ¿Desea dar consentimiento al menor de edad?
        </CheckBox>
      )}

      <CheckBox
        status="control"
        checked={termsAndPolicy}
        style={{ marginVertical: 5 }}
        onChange={value => onChange(value, 'termsAndPolicy')}>
        {props => (
          <Text {...props}>
            Crear una nueva cuenta significa que estás de acuerdo con los{' '}
            <Text
              style={propsStyle(props)}
              onPress={() =>
                navigation.navigate('Dashboard', {
                  screen: 'TermsAndConditions',
                  params: { label: 'Términos y condiciones' },
                })
              }>
              Términos y condiciones
            </Text>{' '}
            así como el{' '}
            <Text
              style={propsStyle(props)}
              onPress={() =>
                navigation.navigate('Dashboard', {
                  screen: 'NoticePrivacy',
                  params: { label: 'Aviso de privacidad' },
                })
              }>
              Aviso de privacidad
            </Text>
          </Text>
        )}
      </CheckBox>

      <CheckBox
        status="control"
        checked={transferData}
        style={{ marginVertical: 5 }}
        onChange={value => onChange(value, 'transferData')}>
        Autorizo la transferencia de mis datos personales a terceros
      </CheckBox>
    </View>
  );

  return (
    <Container
      withBar={{ colorBar: loginGray }}
      withHeader={{
        backgroundColor: loginGray,
        title: 'Crear cuenta',
        accessoryLeft: {
          name: 'arrow-back',
          onPress: () => navigation.goBack(),
        },
      }}>
      <Layout style={Styles.container}>
        <Loading visible={signupSpinner} text="Cargando..." />
        <ModalCard
          dataBtnRigth={{
            text: 'Aceptar',
            onPress: () => {
              if (modalText === MESSAGES.createAccount) {
                navigation.navigate('Menu');
              }
              setModal(false);
            },
          }}
          dataIcon={{ name: 'exclamation-circle' }}
          text={modalText}
          title={
            modalText === MESSAGES.createAccount ? 'Cuenta creada' : '¡Error!'
          }
          visible={modal}
        />

        <FastImage style={styles.imageStyle} source={FondoOcesa2} />
        <FastImage
          style={{ ...styles.imageOcesa, ...Styles.imgLogoCiti }}
          source={OcesaCitiBlanco}
        />

        <ScrollView>
          <View style={{ marginTop: 20 }}>
            <Input
              size="large"
              value={name}
              ref={nameRef}
              status="control"
              caption={nameError}
              autoComplete="name"
              returnKeyType="next"
              placeholder="Nombre (s)"
              style={{ marginVertical: 5 }}
              onChangeText={value => onChange(value, 'name')}
              onSubmitEditing={() => focusTextInput(lastNameRef)}
            />

            <Input
              size="large"
              status="control"
              value={lastName}
              ref={lastNameRef}
              autoComplete="name"
              returnKeyType="next"
              caption={lastNameError}
              placeholder="Apellidos"
              style={{ marginVertical: 5 }}
              onSubmitEditing={() => focusTextInput(birthdayRef)}
              onChangeText={value => onChange(value, 'lastName')}
            />

            <Datepicker
              size="large"
              max={fechaMax}
              date={birthday}
              status="control"
              ref={birthdayRef}
              autoDismiss={true}
              caption={birthdayError}
              min={new Date('1950-08-10')}
              style={{ marginVertical: 5 }}
              placeholder="Fecha de Nacimiento"
              onSelect={value => {
                onChange(value, 'birthday');
                focusTextInput(genderRef);

                if (calcularEdad(value) < 18) {
                  setValidateAge(true);
                } else {
                  setValidateAge(false);
                }
              }}
            />

            <Select
              size="large"
              value={gender}
              ref={genderRef}
              status="control"
              placeholder="Género"
              caption={genderError}
              selectedIndex={genderIndex}
              style={{ marginVertical: 5 }}
              onSelect={value => {
                onChange(value, 'genderIndex');
                focusTextInput(stateRef);
              }}>
              {GENDERS.map((item, index) => (
                <SelectItem title={item} key={`${index}-gender`} />
              ))}
            </Select>

            {/* <Select
              size="large"
              status="control"
              value={country}
              ref={countryRef}
              placeholder="País"
              caption={countryError}
              selectedIndex={countryIndex}
              style={{ marginVertical: 5 }}
              onSelect={value => {
                onChange(value, 'countryIndex');
                focusTextInput(stateRef);
              }}>
              {Countries.map(item => item.name).map((item, index) => (
                <SelectItem title={item} key={`${index}-country`} />
              ))}
            </Select> */}

            <Select
              size="large"
              value={state}
              ref={stateRef}
              status="control"
              placeholder="Estado"
              caption={stateError}
              selectedIndex={stateIndex}
              style={{ marginVertical: 5 }}
              onSelect={value => {
                onChange(value, 'stateIndex');
                focusTextInput(cityRef);
              }}>
              {States.map(item => item.name).map((item, index) => (
                <SelectItem title={item} key={`${index}-state`} />
              ))}
            </Select>

            <Input
              value={city}
              size="large"
              ref={cityRef}
              status="control"
              caption={cityError}
              returnKeyType="next"
              style={{ marginVertical: 5 }}
              placeholder="Ciudad o Municipio"
              onChangeText={value => onChange(value, 'city')}
              onSubmitEditing={() => focusTextInput(emailRef)}
            />

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
              returnKeyType="next"
              caption={passwordError}
              autoComplete="password"
              placeholder="Contraseña"
              accessoryRight={renderIcon}
              style={{ marginVertical: 5 }}
              secureTextEntry={secureTextEntry}
              onChangeText={value => {
                onChange(value, 'password');

                if (!validatePassword(value)) {
                  setPasswordError(MESSAGES.password);
                } else {
                  setPasswordError(undefined);
                }
              }}
              onSubmitEditing={() => focusTextInput(confirmedPasswordRef)}
            />

            <Input
              size="large"
              status="control"
              returnKeyType="done"
              autoComplete="password"
              value={confirmedPassword}
              ref={confirmedPasswordRef}
              caption={confirmedPwdError}
              accessoryRight={renderIcon}
              style={{ marginVertical: 5 }}
              secureTextEntry={secureTextEntry}
              placeholder="Confirmar contraseña"
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={value => {
                onChange(value, 'confirmedPassword');

                if (value !== password) {
                  setConfirmedPwdError(MESSAGES.confirmedPassword);
                } else {
                  setConfirmedPwdError(undefined);
                }
              }}
            />

            {validateAge && (
              <View style={{ width: '100%' }}>
                <Input
                  size="large"
                  status="control"
                  value={parentName}
                  ref={parentNameRef}
                  autoComplete="name"
                  returnKeyType="next"
                  caption={parentNameError}
                  style={{ marginVertical: 5 }}
                  placeholder="Nombre del Padre o Tutor"
                  onChangeText={value => onChange(value, 'parentName')}
                  onSubmitEditing={() => focusTextInput(parentPhoneRef)}
                />

                <Input
                  size="large"
                  status="control"
                  autoComplete="name"
                  value={parentPhone}
                  ref={parentPhoneRef}
                  returnKeyType="done"
                  caption={parentPhoneError}
                  style={{ marginVertical: 5 }}
                  onSubmitEditing={Keyboard.dismiss}
                  placeholder="Teléfono del Padre o Tutor"
                  onChangeText={value => onChange(value, 'parentPhone')}
                />
              </View>
            )}

            <TermsAndPolicy />

            {!termsAndPolicy && (
              <Text
                status="warning"
                category="label"
                style={{ marginVertical: 10, fontStyle: 'italic' }}>
                * Es necesario aceptar los Términos y Condiciones así como el
                Aviso de Privacidad de OCESA.
              </Text>
            )}

            {validateAge && !consentParent && (
              <Text
                status="warning"
                category="label"
                style={{ marginVertical: 10, fontStyle: 'italic' }}>
                * Es necesario dar consentimiento al menor de edad.
              </Text>
            )}

            <View style={{ alignItems: 'center' }}>
              <Button
                status="control"
                disabled={!termsAndPolicy}
                onPress={handleCreateAccount}
                style={{ marginTop: 10, ...Styles.buttonAlignEnd }}>
                Crear cuenta
              </Button>

              <Button
                status="control"
                appearance="ghost"
                onPress={() => navigation.navigate('Login')}
                style={{ ...Styles.buttonAlignEnd }}>
                ¿Ya tienes una cuenta?
              </Button>
            </View>

            <View style={{ height: 70 }} />
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
    resizeMode: 'cover',
  },
  imageOcesa: {
    alignSelf: 'flex-end',
    marginTop: -30,
  },
});

export default CreateAccountScreen;
