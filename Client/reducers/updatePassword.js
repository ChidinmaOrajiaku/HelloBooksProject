import { UPDATE_PASSWORD_SUCCESSFUL, UPDATE_PASSWORD_FAILED, UPDATE_PASSWORD_REQUEST } from '../actions/types';

const initialState = [{
  passwordData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return [{
        passwordData: action.data,
        response: '',
        error: '',
      }, ...state];

    case UPDATE_PASSWORD_SUCCESSFUL:
      return [{
        passwordData: {},
        response: action.response,
        error: '',
      }, ...state];

    case UPDATE_PASSWORD_FAILED:
      return [{
        passwordData: {},
        response: '',
        error: action.error.response.data.errors[0].message,
      }, ...state];

    default: return state;
  }
};
