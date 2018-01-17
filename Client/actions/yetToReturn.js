import axios from 'axios';
import { YET_TO_RETURN_SUCCESSFUL, YET_TO_RETURN_FAILED } from './types';

/**
 *
 *
 * @export
 * @param {any} response
 * @returns {object} gets response if action is successful
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
   * @returns {error} gets error if action fails
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
