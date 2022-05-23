import Config from 'react-native-config';
import { deviceWidth } from './Constants';
import { PlatformCache, UserCache } from '..';
import { Alert, Linking } from 'react-native';
import { convertToTimeZone } from 'date-fns-timezone';
import { EVENT_CATEGORY, getCategories, LOGIN_PLATFORM } from './Constants';
import _ from 'lodash';
import { States } from './index';

const { OLD_IMAGE_URL, NEW_IMAGE_URL } = Config;

// -------------------------- FUNCIONES PARA FORMATO DE FECHA ------------------------------
export const formatTime = time => {
  let splitTime = [];
  splitTime = time.split(':');

  if (splitTime.length === 2) return `${splitTime[0]}_${splitTime[1]}`;

  return null;
};

export const formatMonthDay = (month, day) => {
  let formatMonth = month;
  let formatDay = day;

  if (formatMonth < 10) formatMonth = `0${formatMonth}`;
  if (formatDay < 10) formatDay = `0${formatDay}`;

  return `${formatMonth}_${formatDay}`;
};

export const getToday = (date = null) => {
  const dateObject = new Date(date);

  if (date && isValidDate(dateObject)) return getDateTimeZone(dateObject);
  return getDateTimeZone();
};

export const formatDate = date => {
  const newDate = getDateTimeZone(new Date(date));
  const day = newDate.getDate()
    ? newDate.getDate() < 10
      ? '0' + newDate.getDate()
      : newDate.getDate()
    : 'Fecha';
  const month = getMonthName(newDate.getMonth());

  return `${day} de ${month}`;
};

export const formatDate2 = date => {
  const newDate = getDateTimeZone(new Date(date));
  const day = newDate.getDate()
    ? newDate.getDate() < 10
      ? '0' + newDate.getDate()
      : newDate.getDate()
    : 'Fecha';
  const month = getShortMonthName(newDate.getMonth());

  return { day, month };
};

export const getMonthName = month => {
  let monthText = '';

  switch (month) {
    case 0:
      monthText = 'Enero';
      break;
    case 1:
      monthText = 'Febrero';
      break;
    case 2:
      monthText = 'Marzo';
      break;
    case 3:
      monthText = 'Abril';
      break;
    case 4:
      monthText = 'Mayo';
      break;
    case 5:
      monthText = 'Junio';
      break;
    case 6:
      monthText = 'Julio';
      break;
    case 7:
      monthText = 'Agosto';
      break;
    case 8:
      monthText = 'Septiembre';
      break;
    case 9:
      monthText = 'Octubre';
      break;
    case 10:
      monthText = 'Noviembre';
      break;
    case 11:
      monthText = 'Diciembre';
      break;
    default:
      monthText = 'Evento';
      break;
  }

  return monthText;
};

export const formatShortDate = date => {
  const newDate = getDateTimeZone(new Date(date));
  const day = newDate.getDate()
    ? newDate.getDate() < 10
      ? '0' + newDate.getDate()
      : newDate.getDate()
    : 'Fecha';
  const month = getShortMonthName(newDate.getMonth());

  return `${day} ${month}`;
};

export const getShortMonthName = month => {
  let monthText = '';

  switch (Number(month)) {
    case 0:
      monthText = 'ENE';
      break;
    case 1:
      monthText = 'FEB';
      break;
    case 2:
      monthText = 'MAR';
      break;
    case 3:
      monthText = 'ABR';
      break;
    case 4:
      monthText = 'MAY';
      break;
    case 5:
      monthText = 'JUN';
      break;
    case 6:
      monthText = 'JUL';
      break;
    case 7:
      monthText = 'AGO';
      break;
    case 8:
      monthText = 'SEP';
      break;
    case 9:
      monthText = 'OCT';
      break;
    case 10:
      monthText = 'NOV';
      break;
    case 11:
      monthText = 'DIC';
      break;
    default:
      monthText = 'Evento';
      break;
  }

  return monthText;
};

export const getTodayISOString = (
  date = null,
  month = null,
  year = null,
  hours = null,
  minutes = null,
) => {
  const auxYear = year || currentDate().getCurrentYear;
  const auxMonth = Number.isInteger(month)
    ? month
    : currentDate().getCurrentMonth;
  const auxDate = date || currentDate().getCurrentDate;

  return getDateTimeZone(
    new Date(auxYear, auxMonth, auxDate, hours, minutes),
  ).toISOString();
};

export const formatFullDate = date => {
  const newDate = getDateTimeZone(new Date(date));
  const day = newDate.getDate()
    ? newDate.getDate() < 10
      ? '0' + newDate.getDate()
      : newDate.getDate()
    : 'Fecha';
  const month = getMonthName(newDate.getMonth());
  const year = newDate.getFullYear();

  return `${day} de ${month} de ${year}`;
};

// -------------------- FUNCIÓN QUE VALDIA SI SE PUEDE ABRIR URL O NO --------------------
export const OpenURLButton = async url => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Lo sentimos, no se puede abrir este vínculo: ${url}`);
  }
};

// ----------------------- FUNCIÓN PARA FOCUS DE CAMPOS DE TEXTO -------------------------
export const focusTextInput = textInputRef => {
  textInputRef?.current?.focus?.();
};

// ---------------------------------- HEADERS API------------------------------------------
export const loginHeader = async () => ({
  Authorization: `Bearer ${await UserCache.getToken()}`,
  'X-Dev-Token': 'DEVSUPERTOKEN',
});

// ----------------------------------------- CACHE ----------------------------------------
export const setLoginData = async loginData => {
  await UserCache.setUser(loginData);
  await UserCache.setToken(loginData.token);
  await PlatformCache.setLoginPlatform(loginData.loginPlatform);
};

// ----------------------------------- VALIDACIONES ---------------------------------------
export const validateEmail = email => {
  let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  return reg.test(email);
};

export const validatePassword = password => {
  let reg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
  console.log(reg.test(password));
  return reg.test(password);
};

export const isObject = obj => !!obj && obj.constructor === Object;

/**
 *
 * @param {Array} inputs
 */
export const isEmpty = inputs => {
  let response = false;

  inputs.forEach(item => {
    if (item !== undefined) {
      if (item.length < 1) {
        response = true;
      }
    } else {
      response = true;
    }
  });

  return response;
};

export const calcularEdad = fecha_nacimiento => {
  const hoy = new Date();
  const cumpleanos = new Date(fecha_nacimiento);
  let edad = hoy.getFullYear() - cumpleanos.getFullYear();
  const m = hoy.getMonth() - cumpleanos.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--;
  }
  return edad;
};

export const formatBirthday = date => {
  let format = new Date(date);

  let dd = format.getDate();
  let mm = format.getMonth() + 1;
  const yyyy = format.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  format = `${dd}/${mm}/${yyyy}`;

  return format;
};

// -------------------------------------------- MENSAJES -----------------------------------------
export const loginErrorMessages = (status, data, loginPlatform) => {
  if (loginPlatform === LOGIN_PLATFORM.ocesa) {
    switch (status) {
      case 401:
        return 'El email o contraseña son incorrectos';
      case 409:
        return 'Esta cuenta aun no ha sido confirmada, por favor revisa tu correo';
      default:
        return 'Ha ocurrido un error en la plataforma, por favor intenta más tarde';
    }
  } else {
    if (data.error) {
      switch (data.error) {
        case 'FB_PROFILE_ERROR':
          return 'Ha ocurrido un error al iniciar sesión con tu perfil de Facebook';
        case 'USER_REGISTERED_WITH_DIFFERENT_EMAIL':
          return 'Este usuario ya ha sido registrado on otro Facebook ID';
        case 'FB_TOKEN_VALIDATION_ERROR':
          return 'No se ha podido validar su usuario de Facebook';
        default:
          return 'Ha ocurrido un error en la plataforma, por favor intenta más tarde';
      }
    } else {
      return 'Ha ocurrido un error en la plataforma, por favor intenta más tarde';
    }
  }
};

export const signUpErrorMessages = (status, email) => {
  switch (status) {
    case 409:
      return `El correo ${email} ya ha sido registrado anteriormente`;
    case 422:
      return 'La contraseña debe tener al menos una mayúscula, una minúscula, un dígito y mínimo 8 carácteres';
    case 400:
      'Su sesión ha expirado, por favor vuelva a iniciar sesión';
    default:
      return 'Ha ocurrido un error en la plataforma, por favor intenta más tarde';
  }
};

// ---------------------------------- RESET NAVIGATION -------------------------------------------
export const resetNavigation = (screen, navigation) => {
  navigation.reset({
    index: 0,
    routes: [{ name: screen }],
  });
};

// ----------------------------------- CLOUD MESSAGING -------------------------------------------
export const getFamilyCategory = _source => {
  const categories = _source.categories;
  let isFamily = false;

  if (categories instanceof Array && categories.length > 0) {
    for (let i = 0; i < categories.length; i++) {
      if (
        categories[i] === EVENT_CATEGORY.family ||
        categories[i] === EVENT_CATEGORY.theater
      )
        isFamily = true;
    }
  } else {
    if (getCategories() instanceof Array && getCategories().length > 0) {
      const categoryId =
        _source.categoryId ||
        (_source.body && _source.body.categoryId
          ? _source.body.categoryId
          : null);

      if (categoryId) {
        const findCategoryId = getCategories().find(
          category => category.id === categoryId,
        );
        if (findCategoryId) {
          if (
            findCategoryId.refId === EVENT_CATEGORY.family ||
            findCategoryId.refId === EVENT_CATEGORY.theater
          )
            isFamily = true;
        }
      }
    }
  }

  return isFamily;
};

export const isValidDate = date =>
  date &&
  Object.prototype.toString.call(date) === '[object Date]' &&
  !isNaN(date);

export const getDateTimeZone = (
  date = new Date(),
  timeZone = 'America/Mexico_City',
) => {
  if (isValidDate(date)) return convertToTimeZone(date, { timeZone });
  return convertToTimeZone(new Date(), { timeZone });
};

export const filterArray = array => {
  const auxArray = [];

  if (array.data instanceof Array && array.data.length > 0) {
    for (let i = 0; i < array.data.length; i++)
      if (array.data[i].body) auxArray.push(array.data[i]);
  }

  return auxArray;
};

// ----------------------------------- OPTIMIZAR IMÁGENES --------------------------------------
export const withImageCruncher = (url, size) =>
  url.replace(OLD_IMAGE_URL, NEW_IMAGE_URL) + '?size=' + size;

export const setOptimizedImages = (url, isBig = false) => {
  const size = isBig ? deviceWidth + 150 : 250;
  if (url) {
    return withImageCruncher(url, size);
  }
  return url;
};

// ----------------------------------- Función para eventos por región --------------------------------------
export const getEventsByRegion = (data, separator = false) => {
  const eventsRegion = [];
  let counterLimitRegion = 0;
  let counterLimitOtherStates = 0;
  let eventsByRegion = data;
  let groupEventsByRegion;

  if (data instanceof Array && data.length > 0) {
    groupEventsByRegion = _(data)
      .groupBy(groupEvent => parseInt(groupEvent.score))
      .map((value, key) => {
        for (let i = 0; i < value.length; i++) {
          const closestDateIndex = getClosestIndexDate(value[i].dates);
          value[i].closestDate = value[i].dates[closestDateIndex];
        }

        return {
          eventScore: Number(key),
          events: _.orderBy(value, 'closestDate'),
        };
      })
      .orderBy(orderEvent => orderEvent.eventScore, ['desc'])
      .value();

    if (separator) {
      groupEventsByRegion.forEach(groupEvents => {
        for (let j = 0; j < groupEvents.events.length; j++) {
          if (
            parseInt(groupEvents.events[j].score) === 3 &&
            counterLimitRegion === 0
          ) {
            eventsRegion.push({ limitRegion: true });
            counterLimitRegion += 1;
          }

          if (
            parseInt(groupEvents.events[j].score) === 0 &&
            counterLimitOtherStates === 0
          ) {
            eventsRegion.push({ limitOtherStates: true });
            counterLimitOtherStates += 1;
          }

          eventsRegion.push(groupEvents.events[j]);
        }
      });

      eventsByRegion = eventsRegion;
    } else eventsByRegion = groupEventsByRegion;

    return {
      eventsByRegion,
      eventsScore: groupEventsByRegion.map(eventsKey => eventsKey.eventScore),
    };
  }

  return null;
};

// ----------------------------------- Función para fechas futuras --------------------------------------
export const isCurrentOrFutureDate = (dateTarget, zeroHoursToday = false) => {
  const newDateTarget = getToday(dateTarget);
  let now = getToday();

  if (zeroHoursToday) now = getToday(getToday().setHours(0, 0, 0, 0));

  if (newDateTarget >= now) return true;
  return false;
};

export const isWithinDateRange = (
  startDate,
  endDate,
  zeroHoursToday = false,
  dateTarget = null,
) => {
  let now = getToday(dateTarget);
  const start = getToday(startDate);
  const end = getToday(endDate);

  if (!dateTarget && !isValidDate(now)) now = getToday();
  if (zeroHoursToday) now = getToday(now.setHours(0, 0, 0, 0));

  if (
    startDate &&
    endDate &&
    isValidDate(start) &&
    isValidDate(end) &&
    now >= start &&
    now <= end
  )
    return true;
  return false;
};

// ----------------------------------- Función para cerrar indices --------------------------------------
export const getClosestIndexDate = (dates, dateTarget = null) => {
  const indexNearestDate = getIndexNearestDate(dates, dateTarget);

  if (indexNearestDate > -1) return indexNearestDate;
  return 0;
};

export const getIndexNearestDate = (dates, dateTarget = null) => {
  let now = getToday(dateTarget);
  if (!dateTarget && !isValidDate(now)) now = getToday();

  let closest = Infinity;
  let closestIndex = -1;

  if (Array.isArray(dates) && dates.length > 0) {
    dates.forEach((d, index) => {
      const date = getToday(d);

      if (date >= now && (date < getToday(closest) || date < closest)) {
        closest = d;
        closestIndex = index;
      }
    });
  }

  return closestIndex;
};

// ----------------------------------- Función para obtener el nombre corto del estado --------------------------------------
export const getStateShortName = stateRef => {
  let stateShortName;

  if (stateRef) {
    for (let i = 0; i < States.length; i++) {
      if (stateRef === States[i].ref_id) {
        stateShortName = States[i].shortName;
        break;
      }
    }

    return stateShortName;
  }

  return null;
};

// -----------------------------------OBTENER KILOMETROS ENTRE DOS DISTANCIAS-------------------------------------
export const getKilometers = (lat1, lon1, lat2, lon2) => {
  const rad = x => {
    return (x * Math.PI) / 180;
  };

  const RADIO = 6378.137; //Radio de la tierra en km

  const dLat = rad(lat2 - lat1);
  const dLong = rad(lon2 - lon1);

  const A =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);

  const C = 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));
  const D = RADIO * C;
  return D.toFixed(2);
};
