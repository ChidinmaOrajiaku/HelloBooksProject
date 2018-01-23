import jwt from 'jsonwebtoken';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from './types';

/**
 * Sets current user
 * @export setCurrentUser
 *
 * @param {object} user
 *
 * @returns {object} of current user in redux store
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
/**
 * Logs out a user
 * @export logout
 *
 * @param {object} user
 *
 * @returns {object} clears local storage and emptys user details from store
 */
export function logout() {
  return (dispatch) => {
    localStorage.clear();
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}

export const userSigninRequest = userData => dispatch => axios.post('/api/v1/users/signin', userData)
  .then((res) => {
    const {
      token,
      username
    } = res.data;
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('username', username);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });

