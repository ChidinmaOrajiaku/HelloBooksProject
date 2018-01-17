import axios from 'axios';
import { MODIFY_BOOKS_SUCCESSFUL, MODIFY_BOOKS_FAILED } from './types';


/**
 *
 *
 * @export
 * @param {any} response
 * @returns {response} get response if request is successful
 */
export function modifyBooksResponse(response) {
  return {
    type: MODIFY_BOOKS_SUCCESSFUL,
    response
  };
}

/**
   *
   *
   * @export
   * @param {any} error
   * @returns {object} get error if request fails
   */
export function modifyBooksError(error) {
  return {
    type: MODIFY_BOOKS_FAILED,
    error
  };
}

export const adminModifyRequest = (bookId, bookData) => dispatch => axios.put(`/api/v1/books/${bookId}`, bookData)
  .then((res) => {
    dispatch(modifyBooksResponse(res.data));
  }).catch((error) => {
    dispatch(modifyBooksError('An error occured'));
  });
