import axios from 'axios';
import { GET_BOOKS, BORROW_BOOKS, ADD_BOOKS, DELETE_BOOKS } from './types';


export function getBooks(books) {
  return {
    type: GET_BOOKS,
    books
  };
}

export function borrowBooks(book) {
  return {
    type: BORROW_BOOKS,
    book
  };
}

export function createBooks(book) {
  return {
    type: ADD_BOOKS,
    book
  };
}

export function deleteBooks(book) {
  return {
    type: DELETE_BOOKS,
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

export const getRequest = () => dispatch => axios.get('/api/v1/users/books').then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(getBooks(res.data));
});

export const borrowRequest = (userId, bookData) => dispatch => axios.post(`/api/v1/users/${userId}/books`, bookData).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(borrowBooks(res.data));
});

