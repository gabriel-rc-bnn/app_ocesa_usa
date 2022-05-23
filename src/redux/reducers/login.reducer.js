import { Types } from '../../utils';

const {
  // CLEAN MESSAGES
  CLEAR_MESSAGES_LOGIN,
  // LOAD FB
  LOAD_LOGIN_FB_SUCCESS,
  LOAD_LOGIN_FB_FAIL,
  SHOW_LOGIN_FB_SPINNER,
  // LOAD CHANGE PASSWORD
  LOAD_CHANGE_PASSWORD_FAIL,
  LOAD_CHANGE_PASSWORD_SUCCESS,
  SHOW_CHANGE_PASSWORD_SPINNER,
  // LOAD LOGIN
  LOAD_LOGIN_SUCCESS,
  SHOW_LOGIN_SPINNER,
  LOAD_LOGIN_FAIL,
  // LOAD SIGN UP
  LOAD_SIGN_UP_SUCCESS,
  LOAD_SIGN_UP_FAIL,
  SHOW_SIGN_UP_SPINNER,
  // LOAD RECOVERY
  SHOW_RECOVERY_PASSWORD_SPINNER,
  LOAD_RECOVERY_PASSWORD_FAIL,
  LOAD_RECOVERY_PASSWORD_SUCCESS,
  // LOAD COUNTRIES
  SHOW_COUNTRIES_SPINNER,
  LOAD_COUNTRIES_FAIL,
  LOAD_COUNTRIES_SUCCESS,
  // LOAD STATES
  LOAD_STATES_FAIL,
  SHOW_STATES_SPINNER,
  LOAD_STATES_SUCCESS,
} = Types;

const initialState = {
  // Login
  spinner_login: false,
  data_login: {},
  error_login: { error: false },
  // SignUp
  spinner_sign_up: false,
  data_sign_up: {},
  error_sign_up: { error: false },
  // FB
  spinner_fb: false,
  data_fb: {},
  error_fb: { error: false },
  // CHANGE
  spinner_change: false,
  data_change: {},
  error_change: { error: false },
  // RECOVERY
  spinner_recovery: false,
  data_recovery: {},
  error_recovery: { error: false },
  // COUNTRIES
  spinner_countries: false,
  data_countries: [],
  error_countries: { error: false },
  // STATES
  spinner_states: false,
  data_states: [],
  error_states: { error: false },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_MESSAGES_LOGIN: {
      return { ...state, ...initialState };
    }

    case SHOW_LOGIN_SPINNER: {
      return {
        ...state,
        spinner_login: true,
        data_login: {},
        error_login: { error: false },
      };
    }
    case LOAD_LOGIN_SUCCESS: {
      return {
        ...state,
        spinner_login: false,
        data_login: payload.data,
        error_login: { error: false },
      };
    }
    case LOAD_LOGIN_FAIL: {
      return {
        ...state,
        spinner_login: false,
        data_login: {},
        error_login: { error: true, data: payload.data },
      };
    }

    case SHOW_LOGIN_FB_SPINNER: {
      return {
        ...state,
        spinner_fb: true,
        data_fb: {},
        error_fb: { error: false },
      };
    }
    case LOAD_LOGIN_FB_SUCCESS: {
      return {
        ...state,
        spinner_fb: false,
        data_fb: payload.data,
        error_fb: { error: false },
      };
    }
    case LOAD_LOGIN_FB_FAIL: {
      return {
        ...state,
        spinner_fb: false,
        data_fb: {},
        error_fb: { error: true, data: payload.data },
      };
    }

    case SHOW_RECOVERY_PASSWORD_SPINNER: {
      return {
        ...state,
        spinner_recovery: true,
        data_recovery: {},
        error_recovery: { error: false },
      };
    }
    case LOAD_RECOVERY_PASSWORD_SUCCESS: {
      return {
        ...state,
        spinner_recovery: false,
        data_recovery: payload.data,
        error_recovery: { error: false },
      };
    }
    case LOAD_RECOVERY_PASSWORD_FAIL: {
      return {
        ...state,
        spinner_recovery: false,
        data_recovery: {},
        error_recovery: { error: true, data: payload.data },
      };
    }

    case SHOW_CHANGE_PASSWORD_SPINNER: {
      return {
        ...state,
        spinner_change: true,
        data_change: {},
        error_change: { error: false },
      };
    }
    case LOAD_CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        spinner_change: false,
        data_change: payload.data,
        error_change: { error: false },
      };
    }
    case LOAD_CHANGE_PASSWORD_FAIL: {
      return {
        ...state,
        spinner_change: false,
        data_change: {},
        error_change: { error: true, data: payload.data },
      };
    }

    case SHOW_SIGN_UP_SPINNER: {
      return {
        ...state,
        spinner_sign_up: true,
        data_sign_up: {},
        error_sign_up: { error: false },
      };
    }
    case LOAD_SIGN_UP_SUCCESS: {
      return {
        ...state,
        spinner_sign_up: false,
        data_sign_up: payload.data,
        error_sign_up: { error: false },
      };
    }
    case LOAD_SIGN_UP_FAIL: {
      return {
        ...state,
        spinner_sign_up: false,
        data_sign_up: {},
        error_sign_up: { error: true, data: payload.data },
      };
    }

    case SHOW_COUNTRIES_SPINNER: {
      return {
        ...state,
        spinner_countries: true,
        data_countries: [],
        error_countries: { error: false },
      };
    }
    case LOAD_COUNTRIES_SUCCESS: {
      return {
        ...state,
        spinner_countries: false,
        data_countries: payload.data,
        error_countries: { error: false },
      };
    }
    case LOAD_COUNTRIES_FAIL: {
      return {
        ...state,
        spinner_countries: false,
        data_countries: [],
        error_countries: { error: true, data: payload.data },
      };
    }

    case SHOW_STATES_SPINNER: {
      return {
        ...state,
        spinner_states: true,
        data_states: [],
        error_states: { error: false },
      };
    }
    case LOAD_STATES_SUCCESS: {
      return {
        ...state,
        spinner_states: false,
        data_states: payload.data,
        error_states: { error: false },
      };
    }
    case LOAD_STATES_FAIL: {
      return {
        ...state,
        spinner_states: false,
        data_states: [],
        error_states: { error: true, data: payload.data },
      };
    }

    default: {
      return state;
    }
  }
};
