import axios from 'axios';

export const userSigninRequest = userData => dispatch => axios.post('/api/v1/users/signin', userData);
