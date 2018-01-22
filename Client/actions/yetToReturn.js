import axios from 'axios';
import { YET_TO_RETURN_SUCCESSFUL, YET_TO_RETURN_FAILED } from './types';

/**
 * Unreturned books response if successful
 * @export yetToReturnResponse
 * @param {object} response
 * @returns {object} ofresponse if action is successful
 */
export function yetToReturnResponse(response) {
  return {
    type: YET_TO_RETURN_SUCCESSFUL,
    response
  };
}

/**
   * Unreturned books error if not successful
   * @export yetToReturnError
   * @param {object} error
   * @returns {object} gets error if action fails
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
    dispatch(yetToReturnError('An error occured'));
  });
