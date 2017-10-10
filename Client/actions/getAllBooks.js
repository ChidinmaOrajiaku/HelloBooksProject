import axios from 'axios';
import { GET_BOOKS_SUCCESSFUL, GET_BOOKS_FAILED, GET_BOOKS_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {any} image 
   * @returns 
   */
export function getBooksRequest(data) {
  return {
    type: GET_BOOKS_FAILED,
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
export function getBooksResponse(response) {
  return {
    type: GET_BOOKS_SUCCESSFUL,
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
export function getBooksError(error) {
  return {
    type: GET_BOOKS_REQUEST,
    error
  };
}

export const getRequest = () => dispatch => axios.get('/api/v1/users/books').then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(getBooksResponse(res.data));
}).catch((error) => {
  dispatch(getBooksError(error));
});
