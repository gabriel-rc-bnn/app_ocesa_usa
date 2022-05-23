import { Types } from '../../utils';
const {
  SHOW_NOTIFICATIONS_SPINNER,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_FAIL,
  SET_NOTIFICATIONS_BADGE,
} = Types;

initialState = {
  show_notifications_spinner: false,
  load_notifications_success: {},
  load_notifications_fail: { error: false },
  set_notifications_badge: false,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case SHOW_NOTIFICATIONS_SPINNER: {
      return {
        ...state,
        show_notifications_spinner: true,
        load_notifications_success: {},
        load_notifications_fail: { error: false },
      };
    }
    case LOAD_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        show_notifications_spinner: false,
        load_notifications_success: payload.data,
        load_notifications_fail: { error: false },
      };
    }
    case LOAD_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        show_notifications_spinner: false,
        load_notifications_success: {},
        load_notifications_fail: { error: true, data: payload.data },
      };
    }
    case SET_NOTIFICATIONS_BADGE: {
      return {
        ...state,
        set_notifications_badge: true,
      };
    }
    default: {
      return state;
    }
  }
};
