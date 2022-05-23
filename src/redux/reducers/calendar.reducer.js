import { Types, Constants } from '../../utils';
const {
  //
  SHOW_CALENDAR_SPINNER,
  LOAD_CALENDAR_EVENTS_SUCCES,
  LOAD_CALENDAR_EVENTS_FAIL,
  //
  SHOW_CALENDAR_PRESALES_SPINNER,
  LOAD_CALENDAR_PRESALES_SUCCESS,
  LOAD_CALENDAR_PRESALES_FAIL,
  //
  SHOW_OTHER_PRESALES_SPINNER,
  LOAD_CALENDAR_OTHER_PRESALES_SUCCESS,
  LOAD_CALENDAR_OTHER_PRESALES_FAIL,
  //
  CALENDAR_SET_MONTH,
  //
  SELECT_NAME_CITY,
  //
  CALENDAR_SET_PRESALE,
} = Types;

const InitialState = {
  //
  show_calendar_spinner: false,
  load_calendar_events_success: [],
  load_calendar_events_fail: { error: false },
  //
  show_calendar_presales_spinner: false,
  load_calendar_presales_success: [],
  load_calendar_presales_fail: { error: false },
  //
  show_other_preseales_spinner: false,
  load_calendar_other_preseales_success: [],
  load_calendar_other_preseales_fail: { error: false },
  //
  calendar_set_month: false,
  //
  select_name_city: false,
  //
  select_name_city: false,
};

export default (state = InitialState, { payload, type }) => {
  switch (type) {
    case SHOW_CALENDAR_SPINNER: {
      return {
        ...state,
        show_calendar_spinner: true,
        load_calendar_events_success: [],
        load_calendar_events_fail: { error: false },
      };
    }
    case LOAD_CALENDAR_EVENTS_SUCCES: {
      return {
        ...state,
        show_calendar_spinner: false,
        load_calendar_events_success: payload.data,
        load_calendar_events_fail: { error: false },
      };
    }
    case LOAD_CALENDAR_EVENTS_FAIL: {
      return {
        ...state,
        show_calendar_spinner: false,
        load_calendar_events_success: [],
        load_calendar_events_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_CALENDAR_PRESALES_SPINNER: {
      return {
        ...state,
        show_calendar_presales_spinner: true,
        load_calendar_presales_success: [],
        load_calendar_presales_fail: { error: false },
      };
    }
    case LOAD_CALENDAR_PRESALES_SUCCESS: {
      return {
        ...state,
        show_calendar_presales_spinner: false,
        load_calendar_presales_success: payload.data,
        load_calendar_presales_fail: { error: false },
      };
    }
    case LOAD_CALENDAR_PRESALES_FAIL: {
      return {
        ...state,
        show_calendar_presales_spinner: false,
        load_calendar_presales_success: [],
        load_calendar_presales_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_OTHER_PRESALES_SPINNER: {
      return {
        ...state,
        show_calendar_presales_spinner: false,
        load_calendar_presales_success: [],
        load_calendar_presales_fail: { error: true, data: payload.data },
      };
    }
    case LOAD_CALENDAR_OTHER_PRESALES_SUCCESS: {
      return {
        ...state,
        show_calendar_presales_spinner: false,
        load_calendar_presales_success: [],
        load_calendar_presales_fail: { error: true, data: payload.data },
      };
    }
    case LOAD_CALENDAR_OTHER_PRESALES_FAIL: {
      return {
        ...state,
        show_calendar_presales_spinner: false,
        load_calendar_presales_success: [],
        load_calendar_presales_fail: { error: true, data: payload.data },
      };
    }
    case CALENDAR_SET_MONTH: {
      return {
        ...state,
        calendar_set_month: true,
      };
    }
    case SELECT_NAME_CITY: {
      return {
        ...state,
        select_name_city: true,
      };
    }
    case CALENDAR_SET_PRESALE: {
      return {
        ...state,
        select_name_city: true,
      };
    }
    default: {
      return state;
    }
  }
};
