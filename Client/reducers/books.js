import { GET_BOOKS_COUNT, GET_RENTED_BOOKS_COUNT, GET_NOT_RETURNED_BOOKS_COUNT, GET_CATEGORY_COUNT, CREATE_CATEGORY, SAVE_IMAGE } from '../actions/types';

const initialState = {
  books: {},
  rentedBooks: {},
  image: {},
  notReturnedBooks: {},
  categoryCount: {},
  category: {},
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
    case CREATE_CATEGORY:
      return [{
        createCategory: action.category,
        isCreated: true
      }, ...state];
    case SAVE_IMAGE:
      return [{
        image: action.image
      }, ...state];
    default: return state;
  }
};
