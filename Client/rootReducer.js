import { combineReducers } from 'redux';

import auth from './reducers/auth';
import { booksState, booksIdState } from './reducers/books';
import { userState } from './reducers/profile';
import uploadImage from './reducers/uploadImage';
import createBooks from './reducers/createBooks';

export default combineReducers({
  auth,
  books: booksState,
  booksId: booksIdState,
  userState,
  uploadImage,
  createBooks
});

