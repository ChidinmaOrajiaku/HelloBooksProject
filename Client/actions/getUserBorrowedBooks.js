import axios from 'axios';
import { GET_USER_BORROWED_SUCCESSFUL, GET_USER_BORROWED_FAILED } from './types';

/**
 * Get user borrowed books response if successful
 * @export
 * @param {object} response
 * @returns {object} of response if action is successful
 */
export function getUserBorrowedResponse(response) {
  return {
    type: GET_USER_BORROWED_SUCCESSFUL,
    response
  };
}

/**
   * Get user borrowed books error if not successful
   * @export
   * @param {object} error
   * @returns {object} of error if action fails
   */
export function getUserBorrowedError(error) {
  return {
    type: GET_USER_BORROWED_FAILED,
    error
  };
}

export const getUserBorrowed = usersId => dispatch => axios.get(`/api/v1/users/${usersId}/history`)
  .then((res) => {
    dispatch(getUserBorrowedResponse(res.data));
  }).catch((error) => {
    dispatch(getUserBorrowedError('An error occured'));
  });
