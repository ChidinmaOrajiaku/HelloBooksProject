import axios from 'axios';
import { GET_USER, SET_PROFILE } from './types';


export function getUser(user) {
  return {
    type: GET_USER,
    user
  };
}

export function setProfile(user) {
  return {
    type: SET_PROFILE,
    user
  };
}


export const getUserRequest = userData => dispatch => axios.get('/api/v1/users/:usersId', userData).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(getUser(res.data));
});

export const postProfileRequest = userData => dispatch => axios.post('/api/v1/users/1/profile', userData).then((res) => {
  console.log(userData);
  localStorage.getItem('jwtToken');
  dispatch(setProfile(res.data));
});
