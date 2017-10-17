import axios from 'axios';

export const userSignupRequest = userData => dispatch => axios.post('api/v1/users/signup', userData);
