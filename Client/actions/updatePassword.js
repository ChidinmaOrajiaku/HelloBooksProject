import axios from 'axios';
import { UPDATE_PASSWORD_SUCCESSFUL, UPDATE_PASSWORD_FAILED, UPDATE_PASSWORD_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {data} data 
   * @returns {object} data
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
 * @param {response} response
 * @returns {object} response
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
   * @returns {object} error
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
