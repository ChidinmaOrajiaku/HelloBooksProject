import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './signinAction';
import setAuthToken from '../utils/setAuthToken';
import { SIGN_UP_FAILED } from './types';

/**
 * Sign up error if request fails
 * @export signUpError
 * @param {object} error
 * @returns {object} of signed up error
 */
export function signUpError(error) {
  return {
    type: SIGN_UP_FAILED,
    error
  };
}

export const userSignupRequest = userData => dispatch => axios.post('api/v1/users/signup', userData)
  .then((res) => {
    const {
      token,
      username
    } = res.data;
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('username', username);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  }).catch((error) => {
    dispatch(signUpError(error));
  });
