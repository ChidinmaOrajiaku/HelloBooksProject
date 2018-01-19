import { BORROW_BOOKS_SUCCESSFUL, BORROW_BOOKS_FAILED } from '../actions/types';

const initialState = [{
  borrowData: {},
  response: '',
  error: '',
  hasBorrowed: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case BORROW_BOOKS_SUCCESSFUL:
      return [{
        borrowData: {},
        response: action.response,
        error: '',
        hasBorrowed: true,
      }, ...state];

    case BORROW_BOOKS_FAILED:
      return [{
        borrowData: {},
        response: '',
        error: action.error,
        hasBorrowed: false,
      }, ...state];

    default: return state;
  }
};
