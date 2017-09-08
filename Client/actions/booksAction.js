import axios from 'axios';

export const getAllBooks = dispatch => axios.get('/api/v1/users/books').then((res) => {
  localStorage.getItem('jwtToken');
});

