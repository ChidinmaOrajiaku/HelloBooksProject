import axios from 'axios';
import { GET_CATEGORY_SUCCESSFUL, GET_CATEGORY_FAILED } from './types';

/**
   * Get category response if successful
   * @export getCategoryResponse
   *
   * @param {object} response
   *
   * @returns {object} of category response when request is successful
   */
export function getCategoryResponse(response) {
  return {
    type: GET_CATEGORY_SUCCESSFUL,
    response
  };
}

/**
   * Get category error if not successful
   * @export getCategoryError
   *
   * @param {object} error
   *
   * @returns {object} of category error when request is fails
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
