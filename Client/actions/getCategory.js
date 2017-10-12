import axios from 'axios';
import { GET_CATEGORY_SUCCESSFUL, GET_CATEGORY_FAILED, GET_CATEGORY_REQUEST } from './types';


/**
   * 
   * 
   * @export
   * @param {any} data 
   * @returns {data} category
   */
export function getCategoryRequest(data) {
  return {
    type: GET_CATEGORY_FAILED,
    data
  };
}

/**
   * 
   * 
   * @export
   * @param {any} response
   * @returns {response} category
   */
export function getCategoryResponse(response) {
  return {
    type: GET_CATEGORY_SUCCESSFUL,
    response
  };
}

/**
   * 
   * 
   * @export
   * @param {any} error 
   * @returns {error} error
   */
export function getCategoryError(error) {
  return {
    type: GET_CATEGORY_REQUEST,
    error
  };
}

export const getAllCategoryRequest = () => dispatch => axios.get('/api/v1/books/category/all').then((res) => {
  localStorage.getItem('jwtToken');
  dispatch(getCategoryResponse(res.data));
}).catch((error) => {
  dispatch(getCategoryError(error));
});
