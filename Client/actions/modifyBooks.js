import axios from 'axios';
import { MODIFY_BOOKS_SUCCESSFUL, MODIFY_BOOKS_FAILED, MODIFY_BOOKS_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {any} data
   * @returns {data} data
   */
export function modifyBooksRequest(data) {
  return {
    type: MODIFY_BOOKS_FAILED,
    data
  };
}

/**
 * 
 * 
 * @export
 * @param {any} response
 * @returns {response}  response
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
   * @returns {error} error
   */
export function modifyBooksError(error) {
  return {
    type: MODIFY_BOOKS_REQUEST,
    error
  };
}

export const adminModifyRequest = (bookId, bookData) => dispatch => axios.put(`/api/v1/books/${bookId}`, bookData).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(modifyBooksResponse(res.data));
}).catch((error) => {
  dispatch(modifyBooksError(error));
});
