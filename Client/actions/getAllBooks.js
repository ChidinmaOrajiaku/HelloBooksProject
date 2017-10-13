import axios from 'axios';
import { GET_BOOKS_SUCCESSFUL, GET_BOOKS_FAILED, GET_BOOKS_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {data} data 
   * @returns {data} data
   */
export function getBooksRequest(data) {
  return {
    type: GET_BOOKS_REQUEST,
    data
  };
}

/**
 * 
 * 
 * @export
 * @param {response} response
 * @returns {response} response
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
   * @param {any} error 
   * @returns {error} error
   */
export function getBooksError(error) {
  return {
    type: GET_BOOKS_FAILED,
    error
  };
}

export const getRequest = () => dispatch => axios.get('/api/v1/users/books').then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(getBooksResponse(res.data));
}).catch((error) => {
  dispatch(getBooksError(error));
});
