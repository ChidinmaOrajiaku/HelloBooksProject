import { GET_USER, SET_PROFILE, UPDATE_PASSWORD, GET_PROFILE, UPDATE_PROFILE, COUNT_USERS } from '../actions/types';

const initialState = {
  user: {},
  adminCountUsers: {},
  profile: {},
};

export const userState = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER:
      return {
        user: action.user
      };
    case SET_PROFILE:
      return [
        ...state,
        Object.assign({}, action.profile)
      ];
    case GET_PROFILE:
      return {
        user: action.profile
      };
    case COUNT_USERS:
      return {
        adminCountUsers: action.adminCountUsers
      };
    case UPDATE_PASSWORD:
      return [
        ...state,
        Object.assign({}, action.user)
      ];
    case UPDATE_PROFILE:
      return [
        ...state,
        Object.assign({}, action.profile)
      ];
    default: return state;
  }
};
