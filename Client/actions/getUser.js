import axios from 'axios';
import { GET_USER_SUCCESSFUL, GET_USER_FAILED, GET_USER_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {any} data 
   * @returns {data} data
   */
export function getUserRequest(data) {
  return {
    type: GET_USER_FAILED,
    data
  };
}

/**
   * 
   * 
   * @export
   * @param {any} response
   * @returns {response} response
   */
export function getUserResponse(response) {
  return {
    type: GET_USER_SUCCESSFUL,
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
export function getUserError(error) {
  return {
    type: GET_USER_REQUEST,
    error
  };
}

export const getUserDataRequest = usersId => dispatch => axios.get(`/api/v1/users/${usersId}`).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(getUserResponse(res.data));
}).catch((error) => {
  dispatch(getUserError(error));
});
