import { EDIT_BOOK_ID } from '../actions/types';

const initialState = [{
  getBookId: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case EDIT_BOOK_ID:
      return [{
        getBookId: {},
        response: action.bookId,
        error: '',
      }, ...state];

    default: return state;
  }
};
