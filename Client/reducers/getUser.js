import { GET_USER_SUCCESSFUL, GET_USER_FAILED, GET_USER_REQUEST } from '../actions/types';

const initialState = [{
  getUserData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return [{
        getUserData: action.data,
        response: '',
        error: '',
      }, ...state];

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
