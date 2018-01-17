import { GET_BORROWED_BOOKS_SUCCESSFUL, GET_BORROWED_BOOKS_FAILED } from '../actions/types';

const initialState = [{
  getBorrowedData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_BORROWED_BOOKS_SUCCESSFUL:
      return [{
        getBorrowedData: {},
        response: action.response,
        error: '',
      }, ...state];

    case GET_BORROWED_BOOKS_FAILED:
      return [{
        getBorrowedData: {},
        response: '',
        error: action.error,
      }, ...state];

    default: return state;
  }
};
