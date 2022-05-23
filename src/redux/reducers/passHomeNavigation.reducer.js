import { Types } from '../../utils';
const { PASS_HOME_NAVIGATION } = Types;

initialState = {
  pass_home_navigation: false,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case PASS_HOME_NAVIGATION: {
      return {
        ...state,
        pass_home_navigation: true,
      };
    }
    default: {
      return state;
    }
  }
};
