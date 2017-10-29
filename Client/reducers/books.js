import { GET_BOOKS, BORROW_BOOKS, ADD_BOOKS, DELETE_BOOKS, MODIFY_BOOKS, PUT_BOOKS, GET_BOOKS_COUNT, GET_RENTED_BOOKS_COUNT, SAVE_IMAGE } from '../actions/types';

const initialState = {
  books: {},
  rentedBooks: {},
  image: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_BOOKS_COUNT:
      return [{
        books: action.books
      }, ...state];
    case GET_RENTED_BOOKS_COUNT:
      return [{
        rentedBooks: action.rentedBooks
      }, ...state];
    case SAVE_IMAGE:
      return [{
        image: action.image
      }, ...state];
    default: return state;
  }
};
