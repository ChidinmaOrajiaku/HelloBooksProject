import axios from 'axios';
import { GET_BOOKS_SUCCESSFUL, GET_BOOKS_FAILED } from './types';


/**
 * Get books response if successful
 * @export getBooksResponse
 *
 * @param {object} response
 *
 * @returns {object} of response when request is successful
 */
export function getBooksResponse(response) {
  return {
    type: GET_BOOKS_SUCCESSFUL,
    response
  };
}

/**
   * Get books error if not successful
   * @export getBooksError
   *
   * @param {object} error
   *
   * @returns {object} of an error when request fails
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
