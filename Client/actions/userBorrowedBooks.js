import axios from 'axios';
import { USER_BORROWED_SUCCESSFUL, USER_BORROWED_FAILED, USER_BORROWED_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {data} data 
   * @returns {data} data
   */
export function userBorrowedRequest(data) {
  return {
    type: USER_BORROWED_REQUEST,
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
export function userBorrowedResponse(response) {
  return {
    type: USER_BORROWED_SUCCESSFUL,
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
export function userBorrowedError(error) {
  return {
    type: USER_BORROWED_FAILED,
    error
  };
}

export const userBorrowed = usersId => dispatch => axios.get(`/api/v1/users/${usersId}/history`)
  .then((res) => {
    dispatch(userBorrowedResponse(res.data));
  }).catch((error) => {
    dispatch(userBorrowedError(error));
  });
