import axios from 'axios';
import { GET_A_BOOK_SUCCESSFUL, GET_A_BOOK_FAILED, GET_A_BOOK_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {any} image 
   * @returns 
   */
export function getABookRequest(data) {
  return {
    type: GET_A_BOOK_REQUEST,
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
export function getABookResponse(response) {
  return {
    type: GET_A_BOOK_SUCCESSFUL,
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
export function getABookError(error) {
  return {
    type: GET_A_BOOK_FAILED,
    error
  };
}

export const getBookRequest = id => dispatch => axios.get(`/api/v1/books/${id}`).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(getABookResponse(res.data));
}).catch((error) => {
  dispatch(getABookError(error));
});
