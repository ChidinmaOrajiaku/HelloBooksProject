import axios from 'axios';
import { DELETE_BOOKS_SUCCESSFUL, DELETE_BOOKS_FAILED, DELETE_BOOKS_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {any} data
   * @returns {object} delete books request data
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
    dispatch(deleteBooksError("An error occurred"));
  });
