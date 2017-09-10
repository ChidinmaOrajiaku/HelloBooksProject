import axios from 'axios';


export const adminAddRequest = bookData => dispatch => axios.post('/api/v1/users/books', bookData).then((res) => {
  localStorage.getItem('jwtToken');
});

