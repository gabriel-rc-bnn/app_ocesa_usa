import { Types } from '../../utils';

const {
  //save storage interes
  SAVE_EVENT_INTEREST,
  //remove event interest
  REMOVE_EVENT_INTEREST,
  //clear
  CLEAR_MESSAGES_ATTENDANCE,
  CLEAR_MESSAGES_INTEREST,
  //GET EVENTS_INTEREST
  SHOW_GET_EVENTS_INTEREST_SPINNER,
  LOAD_GET_EVENTS_INTEREST_SUCCESS,
  LOAD_GET_EVENTS_INTEREST_FAIL,
  //SAVE EVENTS_INTEREST
  SHOW_SAVE_EVENT_INTEREST_SPINNER,
  LOAD_SAVE_EVENT_INTEREST_SUCCESS,
  LOAD_SAVE_EVENT_INTEREST_FAIL,
  //DELETE EVENTS_INTEREST
  SHOW_DELETE_EVENT_INTEREST_SPINNER,
  LOAD_DELETE_EVENT_INTEREST_SUCCESS,
  LOAD_DELETE_EVENT_INTEREST_FAIL,
  //GET_EVENTS_ATTENDANCE
  SHOW_GET_EVENT_ATTENDANCE_SPINNER,
  LOAD_GET_EVENTS_ATTENDANCE_FAIL,
  LOAD_GET_EVENTS_ATTENDANCE_SUCCESS,
  //SAVE_EVENT_ATTENDANCE
  SHOW_SAVE_EVENT_ATTENDANCE_SPINNER,
  LOAD_SAVE_EVENT_ATTENDANCE_SUCCESS,
  LOAD_SAVE_EVENT_ATTENDANCE_FAIL,
  //DELETE_EVENT_ATTENDANCE
  SHOW_DELETE_EVENT_ATTENDANCE_SPINNER,
  LOAD_DELETE_EVENT_ATTENDANCE_SUCCESS,
  LOAD_DELETE_EVENT_ATTENDANCE_FAIL,
  //
  SHOW_DELETE_CHECKIN_SPINNER,
  LOAD_DELETE_CHECKIN_FAIL,
  LOAD_DELETE_CHECKIN_SUCCESS,
  //
  SHOW_GET_CHECKIN_SPINNER,
  LOAD_GET_CHECKIN_SUCCESS,
  LOAD_GET_CHECKIN_FAIL,
  //
  SHOW_SAVE_CHECKIN_SPINNER,
  LOAD_SAVE_CHECKIN_SUCCESS,
  LOAD_SAVE_CHECKIN_FAIL,
  //
  SHOW_EDIT_CHECKIN_SPINNER,
  LOAD_EDIT_CHECKIN_SUCCESS,
  LOAD_EDIT_CHECKIN_FAIL,
} = Types;

const initialState = {
  //save storage interes
  save_event_interest: false,
  //remove event interest
  remove_event_interest: false,
  //CLEAR
  clear_messages_attendance: false,
  clear_messages_interest: false,
  //GET  EVENTS INTEREST
  show_get_events_interest_spinner: false,
  load_get_events_interest_success: [],
  load_get_events_interest_fail: { error: false },
  //SAVE EVENTS INTEREST
  show_save_event_interest_spinner: false,
  load_save_event_interest_success: [],
  load_save_event_interest_fail: { error: false },
  //DELETE
  show_delete_event_interest_spinner: false,
  load_delete_event_interest_success: [],
  load_delete_event_interest_fail: { error: false },
  //Get EVENT STTENDENCE
  show_get_event_attendance_spinner: false,
  load_get_events_attendance_succes: [],
  load_get_events_attendance_fail: { error: false },
  //SAVE  EVENT STTENDENCE
  show_save_event_attendance_spinner: false,
  load_save_events_attendance_succes: {},
  load_save_events_attendance_fail: { error: false },
  //delete_event_attendance
  show_delete_event_attendance_spinner: false,
  load_delete_event_attendace_success: {},
  load_delete_event_attendace_fail: { error: false },
  // save checkin
  show_save_checkin_spinner: false,
  load_save_checkin_success: {},
  load_save_checkin_fail: { error: false },
  // delete checkin
  show_delete_checkin_spinner: false,
  load_delete_checkin_success: {},
  load_delete_checkin_fail: { error: false },
  // get checkin
  show_get_checkin_spinner: false,
  load_get_checkin_success: [],
  load_get_checkin_fail: { error: false },
  // edit checkin
  show_edit_checkin_spinner: false,
  load_edit_checkin_success: {},
  load_edit_checkin_fail: { error: false },
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case SAVE_EVENT_INTEREST: {
      return {
        ...state,
        save_event_interest: [],
      };
    }
    case REMOVE_EVENT_INTEREST: {
      return {
        ...state,
        remove_event_interest: true,
      };
    }
    case CLEAR_MESSAGES_ATTENDANCE: {
      return {
        ...state,
        clear_messages_attendance: true,
      };
    }
    case CLEAR_MESSAGES_INTEREST: {
      return {
        ...state,
        clear_messages_interest: true,
      };
    }
    case SHOW_GET_EVENTS_INTEREST_SPINNER: {
      return {
        ...state,
        show_get_events_interest_spinner: true,
        load_get_events_interest_success: [],
        load_get_events_interest_fail: { error: false },
      };
    }
    case LOAD_GET_EVENTS_INTEREST_SUCCESS: {
      return {
        ...state,
        show_get_events_interest_spinner: false,
        load_get_events_interest_success: payload.data,
        load_get_events_interest_fail: { error: false },
      };
    }
    case LOAD_GET_EVENTS_INTEREST_FAIL: {
      return {
        ...state,
        show_get_events_interest_spinner: false,
        load_get_events_interest_success: [],
        load_get_events_interest_fail: { error: true, data: payload },
      };
    }
    case SHOW_SAVE_EVENT_INTEREST_SPINNER: {
      return {
        ...state,
        show_save_event_interest_spinner: true,
        load_save_event_interest_success: [],
        load_save_event_interest_fail: { error: false },
      };
    }
    case LOAD_SAVE_EVENT_INTEREST_SUCCESS: {
      return {
        ...state,
        show_save_event_interest_spinner: false,
        load_save_event_interest_success: payload.data,
        load_save_event_interest_fail: { error: false },
      };
    }
    case LOAD_SAVE_EVENT_INTEREST_FAIL: {
      return {
        ...state,
        show_save_event_interest_spinner: false,
        load_save_event_interest_success: [],
        load_save_event_interest_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_DELETE_EVENT_INTEREST_SPINNER: {
      return {
        ...state,
        show_delete_event_interest_spinner: true,
        load_delete_event_interest_success: [],
        load_delete_event_interest_fail: { error: false },
      };
    }
    case LOAD_DELETE_EVENT_INTEREST_SUCCESS: {
      return {
        ...state,
        show_delete_event_interest_spinner: false,
        load_delete_event_interest_success: payload.data,
        load_delete_event_interest_fail: { error: false },
      };
    }
    case LOAD_DELETE_EVENT_INTEREST_FAIL: {
      return {
        ...state,
        show_delete_event_interest_spinner: false,
        load_delete_event_interest_success: [],
        load_delete_event_interest_fail: { error: false },
      };
    }
    case SHOW_GET_EVENT_ATTENDANCE_SPINNER: {
      return {
        ...state,
        show_get_event_attendance_spinner: true,
        load_get_events_attendance_succes: [],
        load_get_events_attendance_fail: { error: false },
      };
    }
    case LOAD_GET_EVENTS_ATTENDANCE_SUCCESS: {
      return {
        ...state,
        show_get_event_attendance_spinner: false,
        load_get_events_attendance_succes: payload.data,
        load_get_events_attendance_fail: { error: false },
      };
    }
    case LOAD_GET_EVENTS_ATTENDANCE_FAIL: {
      return {
        ...state,
        show_get_event_attendance_spinner: false,
        load_get_events_attendance_succes: [],
        load_get_events_attendance_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_SAVE_EVENT_ATTENDANCE_SPINNER: {
      return {
        ...state,
        show_save_event_attendance_spinner: true,
        load_save_events_attendance_succes: {},
        load_save_events_attendance_fail: { error: false },
      };
    }
    case LOAD_SAVE_EVENT_ATTENDANCE_SUCCESS: {
      return {
        ...state,
        show_save_event_attendance_spinner: false,
        load_save_events_attendance_succes: payload.data,
        load_save_events_attendance_fail: { error: false },
      };
    }
    case LOAD_SAVE_EVENT_ATTENDANCE_FAIL: {
      return {
        ...state,
        show_save_event_attendance_spinner: false,
        load_save_events_attendance_succes: {},
        load_save_events_attendance_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_DELETE_EVENT_ATTENDANCE_SPINNER: {
      return {
        ...state,
        show_delete_event_attendance_spinner: true,
        load_delete_event_attendace_success: {},
        load_delete_event_attendace_fail: { error: false },
      };
    }
    case LOAD_DELETE_EVENT_ATTENDANCE_SUCCESS: {
      return {
        ...state,
        show_delete_event_attendance_spinner: false,
        load_delete_event_attendace_success: payload.data,
        load_delete_event_attendace_fail: { error: false },
      };
    }
    case LOAD_DELETE_EVENT_ATTENDANCE_FAIL: {
      return {
        ...state,
        show_delete_event_attendance_spinner: false,
        load_delete_event_attendace_success: {},
        load_delete_event_attendace_fail: { error: true, data: payload.data },
      };
    }
    case SHOW_SAVE_CHECKIN_SPINNER: {
      return {
        ...state,
        show_save_checkin_spinner: true,
        load_save_checkin_success: [],
        load_save_checkin_fail: { error: false },
      };
    }
    case LOAD_SAVE_CHECKIN_SUCCESS: {
      return {
        ...state,
        show_save_checkin_spinner: false,
        load_save_checkin_success: payload.data,
        load_save_checkin_fail: { error: false },
      };
    }
    case LOAD_SAVE_CHECKIN_FAIL: {
      return {
        ...state,
        show_save_checkin_spinner: false,
        load_save_checkin_success: [],
        load_save_checkin_fail: { error: true, data: payload },
      };
    }
    case SHOW_GET_CHECKIN_SPINNER: {
      return {
        ...state,
        show_get_checkin_spinner: true,
        load_get_checkin_success: [],
        load_get_checkin_fail: { error: false },
      };
    }
    case LOAD_GET_CHECKIN_SUCCESS: {
      return {
        ...state,
        show_get_checkin_spinner: false,
        load_get_checkin_success: payload.data,
        load_get_checkin_fail: { error: false },
      };
    }
    case LOAD_GET_CHECKIN_FAIL: {
      return {
        ...state,
        show_get_checkin_spinner: false,
        load_get_checkin_success: [],
        load_get_checkin_fail: { error: true, data: payload },
      };
    }
    case SHOW_DELETE_CHECKIN_SPINNER: {
      return {
        ...state,
        show_delete_checkin_spinner: true,
        load_delete_checkin_success: {},
        load_delete_checkin_fail: { error: false },
      };
    }
    case LOAD_DELETE_CHECKIN_SUCCESS: {
      return {
        ...state,
        show_delete_checkin_spinner: false,
        load_delete_checkin_success: payload.data,
        load_delete_checkin_fail: { error: false },
      };
    }
    case LOAD_DELETE_CHECKIN_FAIL: {
      return {
        ...state,
        show_delete_checkin_spinner: false,
        load_delete_checkin_success: {},
        load_delete_checkin_fail: { error: true, data: payload },
      };
    }
    case SHOW_EDIT_CHECKIN_SPINNER: {
      return {
        ...state,
        show_edit_checkin_spinner: true,
        load_edit_checkin_success: {},
        load_edit_checkin_fail: { error: false },
      };
    }
    case LOAD_EDIT_CHECKIN_SUCCESS: {
      return {
        ...state,
        show_edit_checkin_spinner: false,
        load_edit_checkin_success: payload.data,
        load_edit_checkin_fail: { error: false },
      };
    }
    case LOAD_EDIT_CHECKIN_FAIL: {
      return {
        ...state,
        show_edit_checkin_spinner: false,
        load_edit_checkin_success: {},
        load_edit_checkin_fail: { error: true, data: payload },
      };
    }
    default: {
      return state;
    }
  }
};
