import axios from 'axios';
import { MODIFY_BOOKS_SUCCESSFUL, MODIFY_BOOKS_FAILED } from './types';


/**
 * Modify books response if successful
 * @export modifyBooksResponse
 * @param {object} response
 * @returns {response} of response if request is successful
 */
export function modifyBooksResponse(response) {
  return {
    type: MODIFY_BOOKS_SUCCESSFUL,
    response
  };
}

/**
   * Modify books error if not successful
   * @export modifyBooksError
   * @param {object} error
   * @returns {object} of error if request fails
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
