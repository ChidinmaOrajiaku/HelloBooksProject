import { GET_USER_SUCCESSFUL, GET_USER_FAILED } from '../actions/types';

const initialState = [{
  getUserData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_SUCCESSFUL:
      return [{
        getUserData: {},
        response: action.response,
        error: '',
      }, ...state];

    case GET_USER_FAILED:
      return [{
        getUserData: {},
        response: '',
        error: action.error,
      }, ...state];

    default: return state;
  }
};
