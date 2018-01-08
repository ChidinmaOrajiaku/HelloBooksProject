import axios from 'axios';
import { GET_BORROWED_BOOKS_SUCCESSFUL, GET_BORROWED_BOOKS_FAILED, GET_BORROWED_BOOKS_REQUEST } from './types';


/**
   *
   *
   * @export
   * @param {any} data
   * @returns {object} get borrowed books request data
   */
export function getBorrowedBooksRequest(data) {
  return {
    type: GET_BORROWED_BOOKS_REQUEST,
    data
  };
}

/**
 *
 *
 * @export
 * @param {any} response
 * @returns {object} get borrowed books response when request is successful
 */
export function getBorrowedBooksResponse(response) {
  return {
    type: GET_BORROWED_BOOKS_SUCCESSFUL,
    response
  };
}

/**
   *
   *
   * @export
   * @param {any} error
   * @returns {object} get borrowed books response when request fails
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
