import { GET_A_BOOK_SUCCESSFUL, GET_A_BOOK_FAILED, GET_A_BOOK_REQUEST } from '../actions/types';

const initialState = [{
  getABookData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_A_BOOK_REQUEST:
      return [{
        getABookData: action.data,
        response: '',
        error: '',
      }, ...state];

    case GET_A_BOOK_SUCCESSFUL:
      return [{
        getABookData: {},
        response: action.response,
        error: '',
      }, ...state];

    case GET_A_BOOK_FAILED:
      return [{
        getABookData: {},
        response: '',
        error: action.error,
      }, ...state];

    default: return state;
  }
};
