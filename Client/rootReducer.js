import { combineReducers } from 'redux';

import auth from './reducers/auth';
import { booksState, booksIdState } from './reducers/books';
import { userState } from './reducers/profile';
import uploadImage from './reducers/uploadImage';
import createBooks from './reducers/createBooks';
import deleteBooks from './reducers/deleteBooks';
import modifyBooks from './reducers/modifyBooks';

export default combineReducers({
  auth,
  books: booksState,
  booksId: booksIdState,
  userState,
  uploadImage,
  createBooks,
  deleteBooks,
  modifyBooks
});

