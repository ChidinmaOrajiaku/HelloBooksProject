import { RETURN_SUCCESSFUL, RETURN_FAILED, RETURN_REQUEST } from '../actions/types';

const initialState = [{
  returnData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RETURN_REQUEST:
      return [{
        returnData: action.data,
        response: '',
        error: '',
      }, ...state];

    case RETURN_SUCCESSFUL:
      return [{
        returnData: {},
        response: action.response,
        error: '',
      }, ...state];

    case RETURN_FAILED:
      return [{
        returnData: {},
        response: '',
        error: action.error.response.data.errors[0].message,
      }, ...state];

    default: return state;
  }
};
