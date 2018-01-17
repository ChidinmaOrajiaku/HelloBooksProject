import axios from 'axios';
import { RETURN_BOOK_SUCCESSFUL, RETURN_BOOK_FAILED } from './types';

/**
 *
 *
 * @export
 * @param {any} response
 * @returns {object} gets return-book response if successful
 */
export function returnResponse(response) {
  return {
    type: RETURN_BOOK_SUCCESSFUL,
    response
  };
}

/**
   *
   *
   * @export
   * @param {any} error
   * @returns {object} gets return-book error if request fails
   */
export function returnError(error) {
  return {
    type: RETURN_BOOK_FAILED,
    error
  };
}

export const returnBook = (usersId, booksId) => dispatch => axios.put(`/api/v1/users/${usersId}/books`, booksId)
  .then((res) => {
    dispatch(returnResponse(res.data));
  }).catch((error) => {
    dispatch(returnError('An error occured'));
  });
