import axios from 'axios';
import { GET_USER_SUCCESSFUL, GET_USER_FAILED } from './types';


/**
   *
   *
   * @export
   * @param {any} response
   * @returns {object}  get response if request is successful
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
   * @returns {object} get error if request fails
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
