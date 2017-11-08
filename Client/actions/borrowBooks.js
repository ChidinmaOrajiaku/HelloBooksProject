import axios from 'axios';
import { BORROW_BOOKS_SUCCESSFUL, BORROW_BOOKS_FAILED, BORROW_BOOKS_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {any} data 
   * @returns {object} borrowed books request data
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
 * @param {any} response
 * @returns {object} borrowed books response
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
   * @returns {object} borrowed books error
   */
export function borrowBooksError(error) {
  return {
    type: BORROW_BOOKS_FAILED,
    error
  };
}

export const borrowRequest = (userId, booksId) => dispatch => axios.post(`/api/v1/users/${userId}/books`, booksId)
  .then((res) => {
    dispatch(borrowBooksResponse(res.data));
  }).catch((error) => {
    dispatch(borrowBooksError(error));
  });
