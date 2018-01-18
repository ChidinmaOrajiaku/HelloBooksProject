import { GET_BOOKS_COUNT, GET_RENTED_BOOKS_COUNT, GET_NOT_RETURNED_BOOKS_COUNT, GET_CATEGORY_COUNT, CREATE_CATEGORY_SUCCESSFUL, CREATE_CATEGORY_FAILED, SAVE_IMAGE } from '../actions/types';

const initialState = {
  books: {},
  rentedBooks: {},
  image: {},
  notReturnedBooks: {},
  categoryCount: {},
  categoryCreate: {},
  categoryError: '',
  updateCount: [],
  isCreated: ''
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_BOOKS_COUNT:
      return [{
        bookCount: action.books
      }, ...state];
    case GET_RENTED_BOOKS_COUNT:
      return [{
        rentedBookCount: action.rentedBooks
      }, ...state];
    case GET_NOT_RETURNED_BOOKS_COUNT:
      return [{
        notReturnedBookCount: action.notReturnedBooks
      }, ...state];
    case GET_CATEGORY_COUNT:
      return [{
        categoryCount: action.categoryCount,
      }, ...state];
    case CREATE_CATEGORY_SUCCESSFUL:
      return [{
        createCategory: action.category,
        isCreated: true
      }, ...state];
    case CREATE_CATEGORY_FAILED:
      return [{
        categoryError: action.error,
        isCreated: false
      }, ...state];
    case SAVE_IMAGE:
      return [{
        image: action.image
      }, ...state];
    default: return state;
  }
};
