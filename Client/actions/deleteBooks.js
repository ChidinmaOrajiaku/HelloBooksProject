import axios from 'axios';
import { DELETE_BOOKS_SUCCESSFUL, DELETE_BOOKS_FAILED } from './types';

/**
 * Delete books response if successful
 * @export
 * @param {object} response
 * @returns {object} of delete books response
 */
export function deleteBooksResponse(response) {
  return {
    type: DELETE_BOOKS_SUCCESSFUL,
    response
  };
}

/**
   * Delete books error if not successful
   * @export
   * @param {object} error
   * @returns {object} of delete books error
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
