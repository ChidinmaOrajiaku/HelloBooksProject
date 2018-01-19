import { YET_TO_RETURN_SUCCESSFUL, YET_TO_RETURN_FAILED } from '../actions/types';

const initialState = [{
  yetToReturnData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
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
        error: action.error,
      }, ...state];

    default: return state;
  }
};
