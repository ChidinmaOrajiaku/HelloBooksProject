import axios from 'axios';
import { CREATE_BOOKS_SUCCESSFUL, CREATE_BOOKS_FAILED, CREATE_BOOKS_REQUEST } from './types';

/**
 * 
 * 
 * @export
 * @param {any} response 
 * @returns {response} response
 */
export function createBooksResponse(response) {
  return {
    type: CREATE_BOOKS_SUCCESSFUL,
    response
  };
}

/**
   * 
   * 
   * @export
   * @param {any} data
   * @returns {data} data
   */
export function createBooksRequest(data) {
  return {
    type: CREATE_BOOKS_REQUEST,
    data
  };
}

/**
   * 
   * 
   * @export
   * @param {any} error 
   * @returns {error} error
   */
export function createBooksError(error) {
  return {
    type: CREATE_BOOKS_FAILED,
    error
  };
}

export const adminAddRequest = bookData => dispatch => axios.post('/api/v1/users/books', bookData).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(createBooksResponse(res.data));
}).catch((error) => {
  dispatch(createBooksError(error));
});
