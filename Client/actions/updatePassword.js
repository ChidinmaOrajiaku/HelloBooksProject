import axios from 'axios';
import { UPDATE_PASSWORD_SUCCESSFUL, UPDATE_PASSWORD_FAILED, UPDATE_PASSWORD_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {any} data 
   * @returns {object} gets user update password request
   */
export function updatePasswordRequest(data) {
  return {
    type: UPDATE_PASSWORD_REQUEST,
    data
  };
}

/**
 * 
 * 
 * @export
 * @param {any} response
 * @returns {object} gets response if update password action is successful
 */
export function updatePasswordResponse(response) {
  return {
    type: UPDATE_PASSWORD_SUCCESSFUL,
    response
  };
}

/**
   *
   *
   * @export
   * @param {any} error
   * @returns {object} gets response if update password action fails
   */
export function updatePasswordError(error) {
  return {
    type: UPDATE_PASSWORD_FAILED,
    error
  };
}

export const updatePassword = (usersId, userData) => dispatch => axios.put(`/api/v1/users/${usersId}`, userData)
  .then((res) => {
    dispatch(updatePasswordResponse(res.data));
  }).catch((error) => {
    dispatch(updatePasswordError(error));
  });
