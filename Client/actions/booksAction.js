import axios from 'axios';


export const adminAddRequest = bookData => dispatch => axios.post('/api/v1/users/books', bookData).then((res) => {
  localStorage.getItem('jwtToken');
});

export const adminDeleteRequest = bookData => dispatch => axios.delete('/api/v1/books'.concat('/') + bookData.id).then((res) => {
  console.log(id);
  localStorage.getItem('jwtToken');
});

