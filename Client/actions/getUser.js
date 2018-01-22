import axios from 'axios';
import { GET_USER_SUCCESSFUL, GET_USER_FAILED } from './types';


/**
   * Get user response if successful
   * @export getUserResponse
   * @param {object} response
   * @returns {object} of response if request is successful
   */
export function getUserResponse(response) {
  return {
    type: GET_USER_SUCCESSFUL,
    response
  };
}

/**
   * Get user error if not successful
   * @export getUserError
   * @param {object} error
   * @returns {object} of error if request fails
   */
export function getUserError(error) {
  return {
    type: GET_USER_FAILED,
    error
  };
}

export const getUserDataRequest = usersId => dispatch => axios.get(`/api/v1/users/${usersId}`)
  .then((res) => {
    dispatch(getUserResponse(res.data));
  }).catch((error) => {
    dispatch(getUserError('An error occured'));
  });
