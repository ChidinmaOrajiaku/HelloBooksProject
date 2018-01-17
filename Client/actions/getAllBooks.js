import axios from 'axios';
import { GET_BOOKS_SUCCESSFUL, GET_BOOKS_FAILED } from './types';


/**
 *
 *
 * @export
 * @param {any} response
 * @returns {object} gets a response when request is successful
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
   * @returns {object} gets an error when request fails
   */
export function getBooksError(error) {
  return {
    type: GET_BOOKS_FAILED,
    error
  };
}

export const getRequest = () => dispatch => axios.get('/api/v1/users/books')
  .then((res) => {
    dispatch(getBooksResponse(res.data));
  }).catch((error) => {
    dispatch(getBooksError('An error occurred'));
  });
