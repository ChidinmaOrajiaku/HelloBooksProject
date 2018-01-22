import axios from 'axios';
import { CREATE_BOOKS_SUCCESSFUL, CREATE_BOOKS_FAILED } from './types';

/**
 *
 * Create books response if successful
 * @export createBooksResponse
 * @param {object} response
 * @returns {object} create books response
 */
export function createBooksResponse(response) {
  return {
    type: CREATE_BOOKS_SUCCESSFUL,
    response
  };
}

/**
   * Create books error if not successful
   * @export createBooksError
   * @param {object} error
   * @returns {object} of create book error
   */
export function createBooksError(error) {
  return {
    type: CREATE_BOOKS_FAILED,
    error
  };
}

export const adminAddRequest = bookData => dispatch => axios.post('/api/v1/users/books', bookData)
  .then((res) => {
    dispatch(createBooksResponse(res.data));
  }).catch((error) => {
    dispatch(createBooksError(error));
  });
