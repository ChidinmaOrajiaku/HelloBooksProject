import axios from 'axios';
import { YET_TO_RETURN_SUCCESSFUL, YET_TO_RETURN_FAILED, YET_TO_RETURN_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {data} data 
   * @returns {data} data
   */
export function yetToReturnRequest(data) {
  return {
    type: YET_TO_RETURN_REQUEST,
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
export function yetToReturnResponse(response) {
  return {
    type: YET_TO_RETURN_SUCCESSFUL,
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
export function yetToReturnError(error) {
  return {
    type: YET_TO_RETURN_FAILED,
    error
  };
}

export const yetToReturn = usersId => dispatch => axios.get(`/api/v1/users/${usersId}/books`)
  .then((res) => {
    dispatch(yetToReturnResponse(res.data));
  }).catch((error) => {
    dispatch(yetToReturnError(error));
  });
