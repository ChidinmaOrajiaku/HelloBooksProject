import axios from 'axios';
import { GET_BOOKS, BORROW_BOOKS, ADD_BOOKS, DELETE_BOOKS, MODIFY_BOOKS, PUT_BOOKS, GET_BOOKS_COUNT, GET_RENTED_BOOKS_COUNT } from './types';

/**
 * 
 * 
 * @export
 * @param {any} books 
 * @returns 
 */
export function getBooks(books) {
  return {
    type: GET_BOOKS,
    books
  };
}

/**
 * 
 * 
 * @export
 * @param {any} books 
 * @returns 
 */
export function adminCount(books) {
  return {
    type: GET_BOOKS_COUNT,
    books
  };
}

/**
 * 
 * 
 * @export
 * @param {any} books 
 * @returns 
 */
export function adminRentedCount(rentedBooks) {
  return {
    type: GET_RENTED_BOOKS_COUNT,
    rentedBooks
  };
}

/**
 * 
 * 
 * @export
 * @param {any} book 
 * @returns 
 */
export function borrowBooks(book) {
  return {
    type: BORROW_BOOKS,
    book
  };
}

/**
 * 
 * 
 * @export
 * @param {any} book 
 * @returns 
 */
export function createBooks(book) {
  return {
    type: ADD_BOOKS,
    book
  };
}

/**
 * 
 * 
 * @export
 * @param {any} book 
 * @returns 
 */
export function deleteBooks(book) {
  return {
    type: DELETE_BOOKS,
    book
  };
}

/**
 * 
 * 
 * @export
 * @param {any} book 
 * @returns 
 */
export function modifyBooks(book) {
  return {
    type: MODIFY_BOOKS,
    book
  };
}

/**
 * 
 * 
 * @export
 * @param {any} book 
 * @returns 
 */
export function putBooks(book) {
  return {
    type: PUT_BOOKS,
    book
  };
}

export const adminAddRequest = bookData => dispatch => axios.post('/api/v1/users/books', bookData).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(createBooks(res.data));
});

export const adminDeleteRequest = bookId => dispatch => axios.delete(`/api/v1/books/${bookId}`).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(deleteBooks(res.data));
});

export const adminPutRequest = bookId => dispatch => axios.put(`/api/v1/books/${bookId}`).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(modifyBooks(res.data));
});

export const adminCountBooksRequest = () => dispatch => axios.get('/api/v1/books').then((res) => {
  localStorage.getItem('jwtToken');
  const countBooks = res.data.count;
  localStorage.setItem('countBooks', countBooks);
  dispatch(adminCount(res.data.count));
});

export const adminCountRentedBooksRequest = () => dispatch => axios.get('/api/v1/users/history').then((res) => {
  localStorage.getItem('jwtToken');
  const countRentedBooks = res.data.count;
  localStorage.setItem('countRentedBooks', countRentedBooks);
  dispatch(adminRentedCount(res.data.count));
});

export const getRequest = () => dispatch => axios.get('/api/v1/users/books').then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(getBooks(res.data));
});

export const borrowRequest = (userId, bookData) => dispatch => axios.post(`/api/v1/users/${userId}/books`, bookData).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(borrowBooks(res.data));
});

export const putBookRequest = (userId, bookData) => dispatch => axios.put(`/api/v1/users/${userId}/books`, bookData).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(putBooks(res.data));
});

