import { Types } from '../../utils';

const { PASS_HOME_NAVIGATION } = Types;

export const passHomeNavigation = navigation => ({
  type: PASS_HOME_NAVIGATION,
  payload: navigation,
});
