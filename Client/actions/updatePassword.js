import axios from 'axios';
import { UPDATE_PASSWORD_SUCCESSFUL, UPDATE_PASSWORD_FAILED, UPDATE_PASSWORD_REQUEST } from './types';


/**
   * Gets data of password update
   * @export
   * @param {object} data
   * @returns {object} of updated password request
   */
export function updatePasswordRequest(data) {
  return {
    type: UPDATE_PASSWORD_REQUEST,
    data
  };
}

/**
 * Update password response if successful
 * @export
 * @param {object} response
 * @returns {object} of update password action is successful
 */
export function updatePasswordResponse(response) {
  return {
    type: UPDATE_PASSWORD_SUCCESSFUL,
    response
  };
}

/**
   * Updated password error if not successful
   * @export
   * @param {object} error
   * @returns {object} of error if update password action fails
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
