import { Types } from '../../utils';
const { SELECT_DATE } = Types;

initialState = {
  select_date: false,
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case SELECT_DATE: {
      return {
        ...state,
        select_date: true,
      };
    }
    default: {
      return state;
    }
  }
};
