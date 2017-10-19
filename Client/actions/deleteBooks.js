import axios from 'axios';
import { DELETE_BOOKS_SUCCESSFUL, DELETE_BOOKS_FAILED, DELETE_BOOKS_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {any} data
   * @returns {data} data
   */
export function deleteBooksRequest(data) {
  return {
    type: DELETE_BOOKS_REQUEST,
    data
  };
}

/**
 * 
 * 
 * @export
 * @param {any} response 
 * @returns {response} response
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
   * @returns {error} error
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
    dispatch(deleteBooksError(error));
  });
