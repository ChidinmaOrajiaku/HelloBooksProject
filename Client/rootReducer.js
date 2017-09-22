import { combineReducers } from 'redux';

import auth from './reducers/auth';
import { booksState, booksIdState } from './reducers/books';
import { userState } from './reducers/profile';

export default combineReducers({
  auth,
  books: booksState,
  booksId: booksIdState,
  userState
});

