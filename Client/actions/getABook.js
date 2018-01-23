import axios from 'axios';
import { GET_A_BOOK_SUCCESSFUL, GET_A_BOOK_FAILED } from './types';


/**
 * Get a book response if successful
 * @export getABookResponse
 *
 * @param {object} response
 *
 * @returns {object} of book response
 */
export function getABookResponse(response) {
  return {
    type: GET_A_BOOK_SUCCESSFUL,
    response
  };
}

/**
   * Get a book error if not successful
   * @export getABookError
   *
   * @param {object} error
   *
   * @returns {object} of book error
   */
export function getABookError(error) {
  return {
    type: GET_A_BOOK_FAILED,
    error
  };
}

export const getBookRequest = id => dispatch => axios.get(`/api/v1/books/${id}`)
  .then((res) => {
    dispatch(getABookResponse(res.data));
  }).catch((error) => {
    dispatch(getABookError('An error occurred'));
  });
