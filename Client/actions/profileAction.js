import axios from 'axios';
import { GET_USER, SET_PROFILE, UPDATE_PASSWORD, GET_PROFILE, UPDATE_PROFILE, COUNT_USERS } from './types';


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

export function getProfile(user) {
  return {
    type: GET_PROFILE,
    user
  };
}

export function updatePassword(user) {
  return {
    type: UPDATE_PASSWORD,
    user
  };
}

export function updateProfile(user) {
  return {
    type: UPDATE_PROFILE,
    user
  };
}

export function adminCountUsers(adminCountUsers) {
  return {
    type: COUNT_USERS,
    adminCountUsers
  };
}


// export const getUserRequest = userData => dispatch => axios.get('/api/v1/users/:usersId', userData).then((res) => {
//   localStorage.getItem('jwtToken');
//   dispatch(getUser(res.data));
// });

export const getProfileRequest = usersId => dispatch => axios.get(`/api/v1/users/${usersId}/profile`).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(getProfile(res.data));
});

export const postProfileRequest = (usersId, userData) => dispatch => axios.post(`/api/v1/users/${usersId}/profile`, userData).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(setProfile(res.data));
});

export const updatePasswordRequest = (usersId, userData) => dispatch => axios.put(`/api/v1/users/${usersId}`, userData).then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(updatePassword(res.data));
});

// export const updateProfileRequest = (usersId, userData) => dispatch => axios.put(`/api/v1/users/${usersId}/profile`, userData).then((res) => {
//   localStorage.getItem('jwtToken');
//   dispatch(updateProfile(res.data));
// });

export const adminCountUserRequest = () => dispatch => axios.get('/api/v1/users/').then((res) => {
  localStorage.getItem('jwtToken');
  const countUsers = res.data.count;
  localStorage.setItem('countUsers', countUsers);
  dispatch(adminCountUsers(res.data.count));
});

