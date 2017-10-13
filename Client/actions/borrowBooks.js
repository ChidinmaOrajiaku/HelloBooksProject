import axios from 'axios';
import { BORROW_BOOKS_SUCCESSFUL, BORROW_BOOKS_FAILED, BORROW_BOOKS_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {data} data 
   * @returns {data} data
   */
export function borrowBooksRequest(data) {
  return {
    type: BORROW_BOOKS_REQUEST,
    data
  };
}

/**
 * 
 * 
 * @export
 * @param {response} response
 * @returns {response} response
 */
export function borrowBooksResponse(response) {
  return {
    type: BORROW_BOOKS_SUCCESSFUL,
    response
  };
}

/**
   * 
   * 
   * @export
   * @param {any} error 
   * @returns {error} error
   */
export function borrowBooksError(error) {
  return {
    type: BORROW_BOOKS_FAILED,
    error
  };
}

export const borrowRequest = (userId, bookData) => dispatch => axios.post(`/api/v1/users/${userId}/books`, bookData).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(borrowBooksResponse(res.data));
}).catch((error) => {
  dispatch(borrowBooksError(error));
});
