import axios from 'axios';
import { DELETE_BOOKS_SUCCESSFUL, DELETE_BOOKS_FAILED, DELETE_BOOKS_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {any} image 
   * @returns 
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
 * @param {any} image 
 * @returns
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
   * @param {any} image 
   * @returns 
   */
export function deleteBooksError(error) {
  return {
    type: DELETE_BOOKS_FAILED,
    error
  };
}

export const adminDeleteRequest = bookId => dispatch => axios.delete(`/api/v1/books/${bookId}`).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(deleteBooksResponse(res.data));
}).catch((error) => {
  dispatch(deleteBooksError(error));
});
