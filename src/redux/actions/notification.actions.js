import { Constants, Types } from '../../utils';

const {
  SHOW_NOTIFICATIONS_SPINNER,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_FAIL,
  SET_NOTIFICATIONS_BADGE,
} = Types;

const { ROUTES } = Constants;

export const loadNotifications =
  (size = 50) =>
  async dispatch => {
    dispatch({ type: SHOW_NOTIFICATIONS_SPINNER });

    (await NotificationsApi())
      .get(ROUTES.notifications, {
        params: { page: 1, size },
      })
      .then(({ data }) => {
        dispatch({ type: LOAD_NOTIFICATIONS_SUCCESS, payload: data });
      })
      .catch(error =>
        dispatch({ type: LOAD_NOTIFICATIONS_FAIL, payload: error.response }),
      );
  };

export const setNotificationsBadge = badge => ({
  type: SET_NOTIFICATIONS_BADGE,
  payload: badge,
});
