import { Types, Constants } from '../../utils';
import _ from 'lodash';
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

const { ROUTES, STORAGE } = Constants;

export const loadCalendarEvents =
  (start = null, end = null, state = null, types = null) =>
  async dispatch => {
    dispatch({ type: SHOW_CALENDAR_SPINNER });
    (await EventsServiceFastlyApi())

      .get(ROUTES.billboard, {
        params: { start, end, state, types },
      })
      .then(response => {
        const { data } = response;
        data.calendarResults = _.filter(data, 'event');
        data.startDate = start;
        data.endDate = end;
        data.stateId = state;

        dispatch({ type: LOAD_CALENDAR_EVENTS_SUCCES, payload: response });
      })
      .catch(error =>
        dispatch({ type: LOAD_CALENDAR_EVENTS_FAIL, payload: error.response }),
      );
  };

export const getPresalesBySponsor = sponsor => async dispatch => {
  dispatch({ type: SHOW_CALENDAR_PRESALES_SPINNER });

  (await SearchEngineApi())
    .get(encodeURI(`${ROUTES.calendarPresales}?by=${sponsor}`))
    .then(response =>
      dispatch({ type: LOAD_CALENDAR_PRESALES_SUCCESS, payload: response }),
    )
    .catch(error =>
      dispatch({ type: LOAD_CALENDAR_PRESALES_FAIL, payload: error.response }),
    );
};

export const getOtherPresales = sponsor => dispatch => {
  dispatch({ type: SHOW_OTHER_PRESALES_SPINNER });

  axios
    .get(encodeURI(`${ROUTES.calendarPresales}?by=${sponsor}`))
    .then(response =>
      dispatch({
        type: LOAD_CALENDAR_OTHER_PRESALES_SUCCESS,
        payload: response,
      }),
    )
    .catch(error =>
      dispatch({
        type: LOAD_CALENDAR_OTHER_PRESALES_FAIL,
        payload: error.response,
      }),
    );
};

export const setMonth = (month, state) => ({
  type: CALENDAR_SET_MONTH,
  payload: { month, state },
});
export const selectNameCity = (month, nameCity, indexCity) => ({
  type: SELECT_NAME_CITY,
  payload: { month, nameCity, indexCity },
});

export const selectPresale = presale => ({
  type: CALENDAR_SET_PRESALE,
  payload: presale,
});
