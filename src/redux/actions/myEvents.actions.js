import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CustomerApi,
  ProfileApi,
  LocationsApi,
  PostponedApi,
  SearchEngineApi,
  NotificationsApi,
  EventsServiceApi,
  EventsServiceFastlyApi,
} from '../../services/Enpoinst';
import * as FirebaseService from '../../firebase';
import { Constants, Types, UserCache } from '../../utils';

const {
  SAVE_EVENT_INTEREST,
  REMOVE_EVENT_INTEREST,
  CLEAR_MESSAGES_ATTENDANCE,
  CLEAR_MESSAGES_INTEREST,
  //GET INTERET
  SHOW_GET_EVENTS_INTEREST_SPINNER,
  LOAD_GET_EVENTS_INTEREST_SUCCESS,
  LOAD_GET_EVENTS_INTEREST_FAIL,
  //SAVE INTEREST
  SHOW_SAVE_EVENT_INTEREST_SPINNER,
  LOAD_SAVE_EVENT_INTEREST_SUCCESS,
  LOAD_SAVE_EVENT_INTEREST_FAIL,
  //DELETE
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
const { ROUTES, STORAGE } = Constants;

export const saveStorageMyInterest = () => ({
  type: SAVE_EVENT_INTEREST,
  payload: SAVE_EVENT_INTEREST,
});

export const removeStorageMyInterest = () => ({
  type: REMOVE_EVENT_INTEREST,
  payload: REMOVE_EVENT_INTEREST,
});

export const clearMessagesAttendance = () => ({
  type: CLEAR_MESSAGES_ATTENDANCE,
});

export const clearMessagesInterest = () => ({
  type: CLEAR_MESSAGES_INTEREST,
});

export const saveMyEventInterest = interest => async dispatch => {
  dispatch({ type: SHOW_SAVE_EVENT_INTEREST_SPINNER });

  (await ProfileApi())
    .post(ROUTES.interests, { type: 'Event', interest })
    .then(async response => {
      dispatch({ type: LOAD_SAVE_EVENT_INTEREST_SUCCESS, payload: response });

      (await ProfileApi())
        .get(ROUTES.interests)
        .then(async responseInterests => {
          await UserCache.setEventsLike(responseInterests);
          dispatch({
            type: LOAD_GET_EVENTS_INTEREST_SUCCESS,
            payload: responseInterests,
          });
        })
        .catch(errorInterests =>
          dispatch({
            type: LOAD_GET_EVENTS_INTEREST_FAIL,
            payload: errorInterests.response,
          }),
        );
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: LOAD_SAVE_EVENT_INTEREST_FAIL,
        payload: error.response,
      });
    });
};

export const deleteMyEventInterest = (eventId, eventSEO) => async dispatch => {
  dispatch({ type: SHOW_DELETE_EVENT_INTEREST_SPINNER });

  (await ProfileApi())
    .delete(`${ROUTES.interests}${eventId}`)
    .then(async response => {
      dispatch({
        type: LOAD_DELETE_EVENT_INTEREST_SUCCESS,
        payload: response,
        eventSEO,
      });

      (await ProfileApi())
        .get(ROUTES.interests)
        .then(async responseAttendance => {
          await UserCache.setEventsLike(responseAttendance.data);
          dispatch({
            type: LOAD_GET_EVENTS_INTEREST_SUCCESS,
            payload: responseAttendance,
          });
        })
        .catch(errorAttendance =>
          dispatch({
            type: LOAD_GET_EVENTS_INTEREST_FAIL,
            payload: errorAttendance.response,
          }),
        );
    })
    .catch(error => {
      dispatch({
        type: LOAD_DELETE_EVENT_INTEREST_FAIL,
        payload: error.response,
      });
    });
};

export const getMyEventsInterest = () => async dispatch => {
  dispatch({ type: SHOW_GET_EVENTS_INTEREST_SPINNER });

  (await ProfileApi())
    .get(ROUTES.interests)
    .then(async response => {
      // console.log('GET EVENTS INTEREST', response.data);
      await UserCache.setEventsLike(response);
      FirebaseService.initialSyncTopicLike(response);
      dispatch({ type: LOAD_GET_EVENTS_INTEREST_SUCCESS, payload: response });
    })
    .catch(error => {
      console.log('ERROR GET MY EVENTS INTEREST:', JSON.stringify(error));

      dispatch({
        type: LOAD_GET_EVENTS_INTEREST_FAIL,
        payload: error,
      });
    });
};

export const saveMyEventAttendance =
  (eventDate, eventAttendanceItem) => async dispatch => {
    dispatch({ type: SHOW_SAVE_EVENT_ATTENDANCE_SPINNER });

    (await ProfileApi())
      .post(ROUTES.attendance, { eventDate })
      .then(async response => {
        dispatch({
          type: LOAD_SAVE_EVENT_ATTENDANCE_SUCCESS,
          payload: response,
          eventAttendanceItem,
        });

        (await ProfileApi())
          .get(ROUTES.attendance)
          .then(async responseAttendance => {
            await UserCache.setEventsAtten(responseAttendance);
            dispatch({
              type: LOAD_GET_EVENTS_ATTENDANCE_SUCCESS,
              payload: responseAttendance,
            });
          })
          .catch(errorAttendance =>
            dispatch({
              type: LOAD_GET_EVENTS_ATTENDANCE_FAIL,
              payload: errorAttendance.response,
            }),
          );
        // console.log(response);
      })
      .catch(error =>
        dispatch({
          type: LOAD_SAVE_EVENT_ATTENDANCE_FAIL,
          payload: error.response,
        }),
      );
  };
//chekin
export const deleteMyEventAttendance =
  (dateId, deleteEventAttendanceSEO, deleteEventAttendanceItem) =>
  async dispatch => {
    dispatch({ type: SHOW_DELETE_EVENT_ATTENDANCE_SPINNER });

    (await ProfileApi())
      .delete(`${ROUTES.attendance}${dateId}`)
      .then(async response => {
        dispatch({
          type: LOAD_DELETE_EVENT_ATTENDANCE_SUCCESS,
          payload: response,
          deleteEventAttendanceSEO,
          deleteEventAttendanceItem,
        });

        (await ProfileApi())
          .get(ROUTES.attendance)
          .then(async responseAttendance => {
            await UserCache.setEventsAtten(responseAttendance);
            dispatch({
              type: LOAD_GET_EVENTS_ATTENDANCE_SUCCESS,
              payload: responseAttendance,
            });
          })
          .catch(errorAttendance =>
            dispatch({
              type: LOAD_GET_EVENTS_ATTENDANCE_FAIL,
              payload: errorAttendance.response,
            }),
          );
      })
      .catch(error =>
        dispatch({
          type: LOAD_DELETE_EVENT_ATTENDANCE_FAIL,
          payload: error.response,
        }),
      );
  };

export const getMyEventsAttendance = () => async dispatch => {
  dispatch({ type: SHOW_GET_EVENT_ATTENDANCE_SPINNER });

  (await ProfileApi())
    .get(ROUTES.attendance)
    .then(async response => {
      await UserCache.setEventsAtten(response);
      FirebaseService.initialSyncTopicAttend(response);
      dispatch({ type: LOAD_GET_EVENTS_ATTENDANCE_SUCCESS, payload: response });
    })
    .catch(error =>
      dispatch({
        type: LOAD_GET_EVENTS_ATTENDANCE_FAIL,
        payload: error.response,
      }),
    );
};

export const saveChekIn = data => async dispatch => {
  dispatch({ type: SHOW_SAVE_CHECKIN_SPINNER });

  (await ProfileApi())
    .post(ROUTES.checkin, data)
    .then(response => {
      dispatch({ type: LOAD_SAVE_CHECKIN_SUCCESS, payload: response });
    })
    .catch(error => {
      dispatch({
        type: LOAD_SAVE_CHECKIN_FAIL,
        payload: error,
      });
    });
};

export const deleteChekIn = eventId => async dispatch => {
  dispatch({ type: SHOW_DELETE_CHECKIN_SPINNER });

  (await ProfileApi())
    .delete(`${ROUTES.checkin}${eventId}`)
    .then(response => {
      dispatch({ type: LOAD_DELETE_CHECKIN_SUCCESS, payload: response });
    })
    .catch(error => {
      dispatch({
        type: LOAD_DELETE_CHECKIN_FAIL,
        payload: error,
      });
    });
};

export const getChekIn = () => async dispatch => {
  dispatch({ type: SHOW_GET_CHECKIN_SPINNER });

  (await ProfileApi())
    .get(ROUTES.checkin)
    .then(response => {
      dispatch({ type: LOAD_GET_CHECKIN_SUCCESS, payload: response.data });
    })
    .catch(error => {
      console.log('ERROR GET DATA CHECKIN', error);

      dispatch({
        type: LOAD_GET_CHECKIN_FAIL,
        payload: error,
      });
    });
};

export const editChekIn = data => async dispatch => {
  dispatch({ type: SHOW_EDIT_CHECKIN_SPINNER });

  (await ProfileApi())
    .put(ROUTES.checkin, data)
    .then(response => {
      dispatch({ type: LOAD_EDIT_CHECKIN_SUCCESS, payload: response });
    })
    .catch(error => {
      dispatch({
        type: LOAD_EDIT_CHECKIN_FAIL,
        payload: error,
      });
    });
};
