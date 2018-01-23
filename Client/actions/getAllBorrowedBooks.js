import axios from 'axios';
import { GET_BORROWED_BOOKS_SUCCESSFUL, GET_BORROWED_BOOKS_FAILED } from './types';


/**
 * Get borrowed books response if successful
 * @export getBorrowedBooksResponse
 *
 * @param {object} response
 *
 * @returns {object} of borrowed books response when request is successful
 */
export function getBorrowedBooksResponse(response) {
  return {
    type: GET_BORROWED_BOOKS_SUCCESSFUL,
    response
  };
}

/**
   * Get books error if not successful
   * @export getBorrowedBooksError
   *
   * @param {object} error
   *
   * @returns {object} of borrowed books response when request fails
   */
export function getBorrowedBooksError(error) {
  return {
    type: GET_BORROWED_BOOKS_FAILED,
    error
  };
}

export const admingetBorrowedRequest = () => dispatch => axios.get('/api/v1/users/books/unreturned')
  .then((res) => {
    dispatch(getBorrowedBooksResponse(res.data));
  }).catch((error) => {
    dispatch(getBorrowedBooksError('An error occurred'));
  });
