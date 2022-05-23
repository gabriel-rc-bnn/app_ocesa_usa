import { Types } from '../../utils';

const { SELECT_DATE } = Types;

export const selectDate = (expanded, dateId) => ({
  type: SELECT_DATE,
  payload: { expanded, dateId },
});
