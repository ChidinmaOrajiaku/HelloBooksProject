import axios from 'axios';
import { BORROW_BOOKS_SUCCESSFUL, BORROW_BOOKS_FAILED } from './types';


/**
 * Borrowed books response if successful
 * @export borrowBooksResponse
 * @param {object} response
 * @returns {object} of borrowed books response
 */
export function borrowBooksResponse(response) {
  return {
    type: BORROW_BOOKS_SUCCESSFUL,
    response
  };
}

/**
   * Borrowed books response if failed
   * @export borrowBooksError
   * @param {object} error
   * @returns {object} of borrowed books error
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
    dispatch(borrowBooksError('An error occurred'));
  });
