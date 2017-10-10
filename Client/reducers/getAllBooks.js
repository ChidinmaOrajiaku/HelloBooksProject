import { GET_BOOKS_SUCCESSFUL, GET_BOOKS_FAILED, GET_BOOKS_REQUEST } from '../actions/types';

const initialState = [{
  getData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_BOOKS_REQUEST:
      return [{
        getData: action.data,
        response: '',
        error: '',
      }, ...state];

    case GET_BOOKS_SUCCESSFUL:
      return [{
        getData: {},
        response: action.response,
        error: '',
      }, ...state];

    case GET_BOOKS_FAILED:
      return [{
        getData: {},
        response: '',
        error: action.error,
      }, ...state];

    default: return state;
  }
};
