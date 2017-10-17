import axios from 'axios';
import { UPDATE_PASSWORD_SUCCESSFUL, UPDATE_PASSWORD_FAILED, UPDATE_PASSWORD_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {data} data 
   * @returns {data} data
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
 * @returns {response} response
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
   * @returns {error} error
   */
export function updatePasswordError(error) {
  return {
    type: UPDATE_PASSWORD_FAILED,
    error
  };
}

export const updatePassword = (usersId, userData) => dispatch => axios.put(`/api/v1/users/${usersId}`, userData).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(updatePasswordResponse(res.data));
}).catch((error) => {
  dispatch(updatePasswordError(error));
});
