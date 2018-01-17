import axios from 'axios';
import { DELETE_BOOKS_SUCCESSFUL, DELETE_BOOKS_FAILED } from './types';

/**
 *
 *
 * @export
 * @param {any} response
 * @returns {object} delete books response
 */
export function deleteBooksResponse(response) {
  return {
    type: DELETE_BOOKS_SUCCESSFUL,
    response
  };
}

/**
   *
   *
   * @export
   * @param {any} error
   * @returns {object} delete books error
   */
export function deleteBooksError(error) {
  return {
    type: DELETE_BOOKS_FAILED,
    error
  };
}

export const adminDeleteRequest = bookId => dispatch => axios.delete(`/api/v1/books/${bookId}`)
  .then((res) => {
    dispatch(deleteBooksResponse(res.data));
  }).catch((error) => {
    dispatch(deleteBooksError('An error occurred'));
  });
