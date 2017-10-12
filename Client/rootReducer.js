import { combineReducers } from 'redux';

import auth from './reducers/auth';
import { booksState, booksIdState } from './reducers/books';
import { userState } from './reducers/profile';
import uploadImage from './reducers/uploadImage';
import createBooks from './reducers/createBooks';
import deleteBooks from './reducers/deleteBooks';
import modifyBooks from './reducers/modifyBooks';
import getAllBooks from './reducers/getAllBooks';
import getAllBorrowedBooks from './reducers/getAllBorrowedBooks';
import getABook from './reducers/getABook';
import editBookId from './reducers/editBooks';
import getCategory from './reducers/getCategory';

export default combineReducers({
  auth,
  books: booksState,
  booksId: booksIdState,
  userState,
  uploadImage,
  createBooks,
  deleteBooks,
  modifyBooks,
  getAllBooks,
  getAllBorrowedBooks,
  getABook,
  editBookId,
  getCategory
});

