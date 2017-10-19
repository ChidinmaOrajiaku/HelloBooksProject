import { YET_TO_RETURN_SUCCESSFUL, YET_TO_RETURN_FAILED, YET_TO_RETURN_REQUEST } from '../actions/types';

const initialState = [{
  yetToReturnData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case YET_TO_RETURN_REQUEST:
      return [{
        yetToReturnData: action.data,
        response: '',
        error: '',
      }, ...state];

    case YET_TO_RETURN_SUCCESSFUL:
      return [{
        yetToReturnData: {},
        response: action.response,
        error: '',
      }, ...state];

    case YET_TO_RETURN_FAILED:
      return [{
        yetToReturnData: {},
        response: '',
        error: action.error.response.data.errors[0].message,
      }, ...state];

    default: return state;
  }
};