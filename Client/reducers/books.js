import { GET_BOOKS, ADD_BOOKS, DELETE_BOOKS } from '../actions/types';

const initialState = {
  books: {}
};

export const booksState = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_BOOKS:
      return [
        ...state,
        Object.assign({}, action.book)
      ];
    case GET_BOOKS:
      return {
        books: action.books
      };
    default: return state;
  }
};

export const booksIdState = (state = initialState, action = {}) => {
  switch (action.type) {
    case DELETE_BOOKS:
      return {
        books: action.books
      };
    default: return state;
  }
};
