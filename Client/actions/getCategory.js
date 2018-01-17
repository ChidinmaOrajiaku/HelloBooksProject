import axios from 'axios';
import { GET_CATEGORY_SUCCESSFUL, GET_CATEGORY_FAILED } from './types';

/**
   *
   *
   * @export
   * @param {any} response
   * @returns {object} get borrowed books response when request is successful
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
   * @returns {object} get borrowed books response when request is fails
   */
export function getCategoryError(error) {
  return {
    type: GET_CATEGORY_FAILED,
    error
  };
}

export const getAllCategoryRequest = () => dispatch => axios.get('/api/v1/books/category/all')
  .then((res) => {
    dispatch(getCategoryResponse(res.data));
  }).catch((error) => {
    dispatch(getCategoryError('An error occurred'));
  });
