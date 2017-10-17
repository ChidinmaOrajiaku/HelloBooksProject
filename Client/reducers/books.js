import { GET_BOOKS, BORROW_BOOKS, ADD_BOOKS, DELETE_BOOKS, MODIFY_BOOKS, PUT_BOOKS, GET_BOOKS_COUNT, GET_RENTED_BOOKS_COUNT, SAVE_IMAGE } from '../actions/types';

const initialState = {
  books: {},
  rentedBooks: {},
  image: {},
};

export const booksState = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_BOOKS:
      return [
        ...state,
        Object.assign({}, action.books)
      ];
    case GET_BOOKS_COUNT:
      return {
        books: action.Books
      };
    case GET_RENTED_BOOKS_COUNT:
      return {
        rentedBooks: action.rentedBooks
      };
    case GET_BOOKS:
      return {
        books: action.books
      };
    case SAVE_IMAGE:
      return [
        ...state,
        Object.assign({}, action.image)
      ];
    default: return state;
  }
};

export const booksIdState = (state = initialState, action = {}) => {
  switch (action.type) {
    case BORROW_BOOKS:
      return [
        ...state,
        Object.assign({}, action.books)
      ];
    case DELETE_BOOKS:
      return [
        ...state,
        Object.assign({}, action.books)
      ];
    case MODIFY_BOOKS:
      return [
        ...state,
        Object.assign({}, action.books)
      ];
    case PUT_BOOKS:
      return [
        ...state,
        Object.assign({}, action.books)
      ];
    default: return state;
  }
};
