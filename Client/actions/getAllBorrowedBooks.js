import axios from 'axios';
import { GET_BORROWED_BOOKS_SUCCESSFUL, GET_BORROWED_BOOKS_FAILED, GET_BORROWED_BOOKS_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {any} image 
   * @returns 
   */
export function getBorrowedBooksRequest(data) {
  return {
    type: GET_BORROWED_BOOKS_FAILED,
    data
  };
}

/**
 * 
 * 
 * @export
 * @param {any} image 
 * @returns
 */
export function getBorrowedBooksResponse(response) {
  return {
    type: GET_BORROWED_BOOKS_SUCCESSFUL,
    response
  };
}

/**
   * 
   * 
   * @export
   * @param {any} image 
   * @returns 
   */
export function getBorrowedBooksError(error) {
  return {
    type: GET_BORROWED_BOOKS_REQUEST,
    error
  };
}

export const admingetBorrowedRequest = () => dispatch => axios.get('/api/v1/users/books/unreturned').then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(getBorrowedBooksResponse(res.data));
}).catch((error) => {
  dispatch(getBorrowedBooksError(error));
});
