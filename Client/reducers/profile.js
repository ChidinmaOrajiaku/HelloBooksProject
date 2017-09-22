import { GET_USER, SET_PROFILE } from '../actions/types';

const initialState = {
  user: {},
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
    default: return state;
  }
};
