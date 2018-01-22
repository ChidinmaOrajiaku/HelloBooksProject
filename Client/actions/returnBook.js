import axios from 'axios';
import { getUserBorrowed } from './getUserBorrowedBooks';
import { RETURN_BOOK_SUCCESSFUL, RETURN_BOOK_FAILED } from './types';

/**
 * Return books response if successful
 * @export returnResponse
 * @param {object} response
 * @returns {object} of return-book response if successful
 */
export function returnResponse(response) {
  return {
    type: RETURN_BOOK_SUCCESSFUL,
    response
  };
}

/**
   * Return books error if not successful
   * @export returnError
   * @param {object} error
   * @returns {object} of return-book error if request fails
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
    dispatch(getUserBorrowed(usersId));
  }).catch((error) => {
    dispatch(returnError('An error occured'));
  });
