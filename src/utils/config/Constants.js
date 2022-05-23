import Colors from '../theme/Colors';
import Config from 'react-native-config';
import { Dimensions } from 'react-native';

const {
  ENVIRONMENT,
  APP_VERSION_NAME,
  USERNAME_WS,
  PSWD_WS,
  URL_DEV_WS,
  URL_PROD_WS,
} = Config;

// ------------------ FUNCIONES PARA TOMAR MEDIDAS DEL DISPOSITIVO -----------------------
export const { width: deviceWidth, height: deviceHeight } =
  Dimensions.get('window');

export const REPONSIVE_HEIGHT =
  deviceHeight * ((deviceWidth / deviceHeight).toFixed(3) / 2).toFixed(3);

// ----------------------------------- IMAGES DEFAULT ----------------------------------------
export const defaulHorizontalImage = `https://ocesa-${ENVIRONMENT}-events-service-herokuapp-com.global.ssl.fastly.net/admin/public/img/horizontal_image_not_found.png`;
export const defaulVerticalImage = `https://ocesa-${ENVIRONMENT}-events-service-herokuapp-com.global.ssl.fastly.net/admin/public/img/vertical_image_not_found.png`;

// ----------------------------------------- APIS ROUTES------------------------------------------
const AUTH_DEV = { username: USERNAME_WS, password: PSWD_WS };
export const APP_VERSION =
  ENVIRONMENT === 'dev' ? `${APP_VERSION_NAME}-DEV` : APP_VERSION_NAME;
const OCESA_WEBSITE_URL = ENVIRONMENT === 'dev' ? URL_DEV_WS : URL_PROD_WS;
const NOTIFICATIONS_NAME = ENVIRONMENT === 'dev' ? 'notifications' : 'notifi';

export const POSTPONED_URL = `${OCESA_WEBSITE_URL}static/postponed-events.json`;
export const LOCATIONS_URL = `https://ocesa-${ENVIRONMENT}-locations.herokuapp.com/`;
export const CUSTOMER_URL = `https://ocesa-${ENVIRONMENT}-customer-api.herokuapp.com/`;
export const PROFILE_URL = `https://ocesa-${ENVIRONMENT}-customer-profiler.herokuapp.com/`;
export const SEARCH_ENGINE_URL = `https://ocesa-${ENVIRONMENT}-search-engine.herokuapp.com/`;
export const EVENTS_SERVICE_URL = `https://ocesa-${ENVIRONMENT}-events-service.herokuapp.com/api/`;
export const NOTIFICATIONS_URL = `https://ocesa-${ENVIRONMENT}-${NOTIFICATIONS_NAME}-center.herokuapp.com/api/v1/`;
export const EVENTS_SERVICE_FASTLY_URL = `https://ocesa-${ENVIRONMENT}-events-service-herokuapp-com.global.ssl.fastly.net/api/`;

export const BASIC_AUTH_DEV = ENVIRONMENT === 'dev' ? AUTH_DEV : null;

export const ROUTES = {
  // --------------- RUTAS PROBADAS -------------
  // CUSTOMER API
  login: 'login/',
  signUp: 'sign-up',
  loginFB: 'fb-login',
  recoveryPassword: 'password-recovery',

  // PROFILE API
  profile: 'profile/',

  // LOCATIONS API
  states: 'states/',
  countries: 'countries',

  // NOTIFICATIONS API
  devices: 'mailboxes/me/devices/',
  notifications: 'mailboxes/me/notifications/',
  readNotificationByBatch: 'mailboxes/me/notifications/batch-read/',

  // PROBANDO
  checkin: 'check-in/',
  eventProfiler: 'event-profiler',
  spotify: 'spotify',
  cards: 'cards',
  musicGenreProfiler: 'music-genre-profiler',
  genres: 'EventQualifiers',
  interests: 'interests/',
  attendance: 'attendance/',
  search: 'search',
  byGenre: 'by-genre/',
  trendings: 'trendings',
  recommendations: 'recommend',
  getArtists: 'Artists/getArtists',
  recently: 'recently',
  _event: 'event',
  slider: 'slider',
  MSICatalog:
    'SpecialEventDeals?filter[where][specialDealTypeId]=deferred_payments',
  citiMSITerms: 'SpecialEventDeals?filter[where][ref]=MCB',
  topHits: 'top-hits',
  venues: 'venues',
  byArtist: 'by-artist/',
  byCategory: 'by-category/',
  fixedCards: 'fixedCars',
  conecta_en_vivo: 'conecta-en-vivo',

  // --------------- RUTAS NO PROBADAS -------------
  filter: 'filters',
  getArtists: 'Artists/getArtists',
  manageable_content: 'manageable-contents',
  sponsors: 'Sponsors',
  direct: 'direct',
  _event: 'event',
  event: 'event/',
  presales: 'presales',
  calendarEvents: 'eventDates',
  calendarPresales: 'presales',
  similar: 'similar',
  byVenue: 'by-venue/',
  byCategoryAndGenre: 'by-category-genre/',
  family: 'familiares',
  activeArtist: 'Artists/active',
  configProperties: 'AppConfigProperties/',
  mainBanner: 'main_banner_url',
  password: 'password',
  readAllNotifications: 'mailboxes/me/notifications/read-all',
  presalesCitibanamex: 'eventdealdates/presales/citibanamex',
  eventDealDates: 'EventDealDates/load',
  eventCategories: 'EventCategories',
  billboard: 'eventDates/billboard',
  statesWithDates: 'eventDates/states-with-dates',
  monthsWithDates: 'eventDates/months-with-dates',
  categoriesAndGenres: 'EventCategories/with-events-qualifiers',
  MSICatalog:
    'SpecialEventDeals?filter[where][specialDealTypeId]=deferred_payments',
  banners: 'Banners',
  msiBanner: 'by-search-group/3_6_9_msi',
  postponedEvent: 'by-search-group/postponed',
  read: 'read',
  apiPostponedEvent: 'eventDates/postponed',
};

// -------------------------------------------- TEXTOS -----------------------------------------
export const LOGIN_PLATFORM = {
  facebook: 'facebook',
  ocesa: 'ocesa',
};

export const GENDERS = ['Masculino', 'Femenino', 'Otro'];

export const MESSAGES = {
  emptyField: 'Campo obligatorio',
  emailError: 'Introduzca un correo válido',
  insuficientTastes: 'Elige al menos 5 gustos',
  confirmedPassword: 'Las contraseñas no coinciden',
  password:
    'Mínimo 8 caracteres, máximo 15.\nAl menos una letra mayúscula y minúscula.' +
    '\nAl menos un dígito.\nAl menos 1 caracter especial.\nSin espacios en blanco.',
  createAccount:
    'Tu cuenta ha sido creada. Se ha enviado un link por correo electrónico para confirmar tu cuenta y puedas acceder a la app',
  errorLoginFB:
    'Ha ocurrido un error con la plataforma de Facebook, intenta más tarde',
  authorizationData:
    'Autorizo la transferencia de mis datos personales a terceros.',
  emailSend: 'Revisa el correo que hemos enviado a tu cuenta.',
  emailNotExists: 'El correo que ingresó, no existe en la plataforma.',
  errorPlatform: 'Hubo un error en la plataforma, intente más tarde.',
  insuficientArtist:
    'Por favor, selecciona al menos 5 artistas para continuar con el proceso.',
};

// ------------------------------------ NOTIFICATIONS CONSTANTS --------------------------------
export const NOTIFICATIONS_CONSTANTS = {
  number: 30,
  sourceApp: 'app_mx_inbox',
  sourcePush: 'app_mx_push',
};

// ------------------------------------- GOOGLE ANALYTICS --------------------------------------
let homeProps;

export const setHomeProps = props => {
  homeProps = props;
};

export const getHomeProps = () => homeProps;

// ---------------------------------------- PROMOTIONS -------------------------------------------
let categories;
let cancelAxios;

export const setCategories = allCategories => {
  categories = allCategories;
};
export const getCategories = () => categories;

// ---------------------------------------- EVENTS TYPES ------------------------------------------
export const EVENT_CATEGORY = {
  concert: 'concierto',
  festival: 'festival',
  family: 'familiares',
  theater: 'teatro',
};

//-------------------------------------------- DEALS ----------------------------------------------

export const BANKS = {
  citibanamex: 'citibanamex',
  scotiabank: 'scotiabank',
  santander: 'santander',
};

export const deals = {
  presale: 'presale',
  specials: 'citibanamex_special_deals',
  msi: 'deferred_payments',
  experiences: 'citibanamex_experiences',
};

// ------------------------------------------ HTML STYLES ---------------------------------------------
export const FONTS = {
  regular: 'Interstate-Regular',
  black: 'Interstate-Black',
  bold: 'Interstate-Blod',
};

export const STYLES_HTML_TAGS = {
  a: {
    fontFamily: FONTS.regular,
    color: Colors.active,
    fontWeight: 'normal',
  },
  h1: {
    fontFamily: FONTS.black,
    fontSize: 24,
    textAlign: 'center',
  },
  h2: {
    fontSize: 20 - 5,
  },
  p: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    textAlign: 'justify',
  },
};
