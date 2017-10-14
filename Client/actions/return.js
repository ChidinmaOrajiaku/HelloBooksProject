import axios from 'axios';
import { RETURN_SUCCESSFUL, RETURN_FAILED, RETURN_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {data} data 
   * @returns {data} data
   */
export function returnRequest(data) {
  return {
    type: RETURN_REQUEST,
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
export function returnResponse(response) {
  return {
    type: RETURN_SUCCESSFUL,
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
export function returnError(error) {
  return {
    type: RETURN_FAILED,
    error
  };
}

export const returnBook = usersId => dispatch => axios.put(`/api/v1/users/${usersId}/books`).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(returnResponse(res.data));
}).catch((error) => {
  dispatch(returnError(error));
});
