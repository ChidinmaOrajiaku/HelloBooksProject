import axios from 'axios';
import { GET_USER_BORROWED_SUCCESSFUL, GET_USER_BORROWED_FAILED, GET_USER_BORROWED_REQUEST } from './types';


/**
   *
   *
   * @export
   * @param {any} data
   * @returns {object} gets user borrowed books request data
   */
export function getUserBorrowedRequest(data) {
  return {
    type: GET_USER_BORROWED_REQUEST,
    data
  };
}

/**
 *
 *
 * @export
 * @param {any} response
 * @returns {object} gets response if action is successful
 */
export function getUserBorrowedResponse(response) {
  return {
    type: GET_USER_BORROWED_SUCCESSFUL,
    response
  };
}

/**
   *
   *
   * @export
   * @param {any} error
   * @returns {object} gets error if action fails
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
