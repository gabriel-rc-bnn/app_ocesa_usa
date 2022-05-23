import {
  Types,
  UserCache,
  Constants,
  Functions,
  PlatformCache,
} from '../../utils';
import * as FirebaseService from '../../firebase';
import { CustomerApi, ProfileApi, LocationsApi } from '../../services/Enpoinst';

const {
  // CLEAN MESSAGES
  CLEAR_MESSAGES_LOGIN,
  RESET,
  //LOAD FB
  LOAD_LOGIN_FB_SUCCESS,
  LOAD_LOGIN_FB_FAIL,
  SHOW_LOGIN_FB_SPINNER,
  //LOAD CHANGE PASSWORD
  LOAD_CHANGE_PASSWORD_FAIL,
  LOAD_CHANGE_PASSWORD_SUCCESS,
  SHOW_CHANGE_PASSWORD_SPINNER,
  //LOAD LOGIN
  LOAD_LOGIN_FAIL,
  LOAD_LOGIN_SUCCESS,
  SHOW_LOGIN_SPINNER,
  //LOAD SIGN UP
  LOAD_SIGN_UP_FAIL,
  LOAD_SIGN_UP_SUCCESS,
  SHOW_SIGN_UP_SPINNER,
  //LOAD RECOVERY
  SHOW_RECOVERY_PASSWORD_SPINNER,
  LOAD_RECOVERY_PASSWORD_FAIL,
  LOAD_RECOVERY_PASSWORD_SUCCESS,
  //LOAD COUNTRIES
  SHOW_COUNTRIES_SPINNER,
  LOAD_COUNTRIES_FAIL,
  LOAD_COUNTRIES_SUCCESS,
  //LOAD STATES
  LOAD_STATES_FAIL,
  SHOW_STATES_SPINNER,
  LOAD_STATES_SUCCESS,
} = Types;

const { setLoginData } = Functions;
const { ROUTES, LOGIN_PLATFORM } = Constants;

export const clearMessagesLogin = () => ({
  type: CLEAR_MESSAGES_LOGIN,
});

export const resetRedux = () => ({
  type: RESET,
});

export const login = (username, password) => async dispatch => {
  dispatch({ type: SHOW_LOGIN_SPINNER });

  (await CustomerApi())
    .post(ROUTES.login, { username, password })
    .then(async response => {
      await UserCache.setToken(response.data.token);
      response.data.loginPlatform = LOGIN_PLATFORM.ocesa;

      (await ProfileApi())
        .get(ROUTES.profile)
        .then(async responseProfile => {
          response.data.username = username;

          if (responseProfile.data.insuficient) {
            response.data.profileTastes = true;
          } else {
            response.data.profileTastes = false;
          }

          await setLoginData(response.data);
          FirebaseService.logEvent(FirebaseService.eventName.loginOCESA);

          dispatch({ type: LOAD_LOGIN_SUCCESS, payload: response });
        })
        .catch(async errorProfile => {
          await UserCache.removeAll();
          await PlatformCache.removeAll();
          errorProfile.response.loginPlatform = LOGIN_PLATFORM.ocesa;
          dispatch({ type: LOAD_LOGIN_FAIL, payload: errorProfile.response });
        });
    })
    .catch(async error => {
      await UserCache.removeAll();
      await PlatformCache.removeAll();
      error.response.loginPlatform = LOGIN_PLATFORM.ocesa;
      dispatch({ type: LOAD_LOGIN_FAIL, payload: error.response });
    });
};

export const signUp = userData => async dispatch => {
  const data = {
    locale: null,
    timezone: null,
    email: userData.email,
    gender: userData.gender,
    firstname: userData.name,
    city_name: userData.city,
    state_name: userData.state,
    password: userData.password,
    birthday: userData.birthday,
    lastname: userData.lastName,
    share: userData.transferData,
    state_id: userData.stateCode,
    country_name: userData.country,
    parent_name: userData.parentName,
    parent_phone: userData.parentPhone,
    country_code: userData.countryCode,
    consent_by_parents: userData.consentParent,
  };

  dispatch({ type: SHOW_SIGN_UP_SPINNER });

  (await CustomerApi())
    .post(ROUTES.signUp, data)
    .then(response => {
      dispatch({ type: LOAD_SIGN_UP_SUCCESS, payload: response });
      FirebaseService.logEvent(FirebaseService.eventName.signUp);
    })
    .catch(error =>
      dispatch({ type: LOAD_SIGN_UP_FAIL, payload: error.response }),
    );
};

export const loginFB = (token, username, share) => async dispatch => {
  dispatch({ type: SHOW_LOGIN_FB_SPINNER });

  (await CustomerApi())
    .post(ROUTES.loginFB, { token, share })
    .then(async response => {
      await UserCache.setToken(response.data.token);
      response.data.loginPlatform = LOGIN_PLATFORM.facebook;

      (await ProfileApi())
        .get(ROUTES.profile)
        .then(async responseProfile => {
          response.data.username = username;

          if (responseProfile.data.insuficient) {
            response.data.profileTastes = true;
          } else {
            response.data.profileTastes = false;
          }

          await setLoginData(response.data);
          FirebaseService.logEvent(FirebaseService.eventName.loginFB);

          dispatch({ type: LOAD_LOGIN_FB_SUCCESS, payload: response });
        })
        .catch(async errorProfile => {
          await UserCache.removeAll();
          await PlatformCache.removeAll();
          errorProfile.response.loginPlatform = LOGIN_PLATFORM.facebook;
          dispatch({
            type: LOAD_LOGIN_FB_FAIL,
            payload: errorProfile.response,
          });
        });
    })
    .catch(async error => {
      await UserCache.removeAll();
      await PlatformCache.removeAll();
      error.response.loginPlatform = LOGIN_PLATFORM.facebook;
      dispatch({ type: LOAD_LOGIN_FB_FAIL, payload: error.response });
    });
};

export const recoveryPassword = email => async dispatch => {
  dispatch({ type: SHOW_RECOVERY_PASSWORD_SPINNER });

  (await CustomerApi())
    .post(ROUTES.recoveryPassword, { email })
    .then(response => {
      dispatch({ type: LOAD_RECOVERY_PASSWORD_SUCCESS, payload: response });
    })
    .catch(response => {
      dispatch({ type: LOAD_RECOVERY_PASSWORD_FAIL, payload: response });
    });
};

export const changePassword =
  ({ password, newPassword }) =>
  async dispatch => {
    dispatch({ type: SHOW_CHANGE_PASSWORD_SPINNER });

    (await CustomerApi())
      .patch(ROUTES.password, { password, newPassword })
      .then(response => {
        dispatch({ type: LOAD_CHANGE_PASSWORD_SUCCESS, payload: response });
        FirebaseService.logEvent(FirebaseService.eventName.changePassword);
      })
      .catch(error => {
        dispatch({
          type: LOAD_CHANGE_PASSWORD_FAIL,
          payload: error.response,
        });
      });
  };

export const loadCountries = () => async dispatch => {
  dispatch({ type: SHOW_COUNTRIES_SPINNER });

  (await LocationsApi())
    .get(ROUTES.countries, { params: { lang: 'es' } })
    .then(response => {
      dispatch({ type: LOAD_COUNTRIES_SUCCESS, payload: response });
    })
    .catch(error => {
      dispatch({ type: LOAD_COUNTRIES_FAIL, payload: error.response });
    });
};

export const loadStates = id => async dispatch => {
  dispatch({ type: SHOW_STATES_SPINNER });

  (await LocationsApi())
    .get(`${ROUTES.states}${id}`, { params: { lang: 'es' } })
    .then(response => {
      dispatch({ type: LOAD_STATES_SUCCESS, payload: response });
    })
    .catch(error =>
      dispatch({ type: LOAD_STATES_FAIL, payload: error.response }),
    );
};
