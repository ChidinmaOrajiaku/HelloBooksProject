import { GET_CATEGORY_SUCCESSFUL, GET_CATEGORY_FAILED } from '../actions/types';

const initialState = [{
  getCategoryData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CATEGORY_SUCCESSFUL:
      return [{
        getCategoryData: {},
        response: action.response,
        error: '',
      }, ...state];

    case GET_CATEGORY_FAILED:
      return [{
        getCategoryData: {},
        response: '',
        error: action.error,
      }, ...state];

    default: return state;
  }
};
