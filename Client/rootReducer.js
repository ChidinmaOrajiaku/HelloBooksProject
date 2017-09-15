import { combineReducers } from 'redux';

import auth from './reducers/auth';
import { booksState, booksIdState } from './reducers/books';

export default combineReducers({
  auth,
  books: booksState,
  booksId: booksIdState,
});

