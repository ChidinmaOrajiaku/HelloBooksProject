import { COUNT_USERS } from '../actions/types';

const initialState = {
  user: {},
  adminCountUsers: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case COUNT_USERS:
      return {
        adminCountUsers: action.adminCountUsers
      };
    default: return state;
  }
};
