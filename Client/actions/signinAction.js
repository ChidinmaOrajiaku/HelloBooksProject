import jwt from 'jsonwebtoken';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.clear();
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}

export const userSigninRequest = userData => dispatch => axios.post('/api/v1/users/signin', userData).then((res) => {
  const token = res.data.token;
  const username = res.data.username;
  localStorage.setItem('jwtToken', token);
  localStorage.setItem('username', username);
  setAuthToken(token);
  dispatch(setCurrentUser(jwt.decode(token)));
});

