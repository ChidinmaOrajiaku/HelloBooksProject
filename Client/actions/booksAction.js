import axios from 'axios';
import {
  GET_BOOKS_COUNT,
  GET_RENTED_BOOKS_COUNT,
  GET_NOT_RETURNED_BOOKS_COUNT,
  CREATE_CATEGORY,
  GET_CATEGORY_COUNT,
  SAVE_IMAGE_FAILED,
  SAVE_IMAGE_SUCCESSFUL,
  SAVE_IMAGE_REQUEST,
} from './types';


/**
 *
 *
 * @export
 * @param {any} books
 * @returns {object} books count
 */
export function adminCount(books) {
  return {
    type: GET_BOOKS_COUNT,
    books
  };
}

/**
 *
 *
 * @export
 * @param {any} rentedBooks
 * @returns {object} rented books
 */
export function adminRentedCount(rentedBooks) {
  return {
    type: GET_RENTED_BOOKS_COUNT,
    rentedBooks
  };
}

/**
 *
 *
 * @export
 * @param {any} notReturnedBooks
 * @returns {object} notReturnedBooks
 */
export function adminNotReturnedCount(notReturnedBooks) {
  return {
    type: GET_NOT_RETURNED_BOOKS_COUNT,
    notReturnedBooks
  };
}

/**
 *
 *
 * @export
 * @param {any} category
 * @returns {object} category
 */
export function adminCreateCategory(category) {
  return {
    type: CREATE_CATEGORY,
    category
  };
}

/**
 *
 *
 * @export
 * @param {any} categoryCount
 * @returns {object} categoryCount
 */
export function adminCountCategory(categoryCount) {
  return {
    type: GET_CATEGORY_COUNT,
    categoryCount
  };
}

/**
 *
 *
 * @export
 * @param {any} response
 * @returns {object} image saved
 */
export function saveImageResponse(response) {
  return {
    type: SAVE_IMAGE_SUCCESSFUL,
    response
  };
}

/**
 *
 *
 * @export
 * @param {any} data
 * @returns {object} image data request
 */
export function saveImageRequest(data) {
  return {
    type: SAVE_IMAGE_REQUEST,
    data
  };
}

/**
 *
 *
 * @export
 * @param {any} error
 * @returns {object} image failed
 */
export function saveImageError(error) {
  return {
    type: SAVE_IMAGE_FAILED,
    error
  };
}

export const adminCountBooksRequest = () => dispatch => axios.get('/api/v1/books').then((res) => {
  dispatch(adminCount(res.data.count));
});

export const adminCountRentedBooksRequest = () => dispatch => axios.get('/api/v1/rentedbooks/history/all')
  .then((res) => {
    dispatch(adminRentedCount(res.data.count));
  });

export const adminCountNotReturnedBooksRequest = () => dispatch => axios.get('/api/v1/users/books/unreturned/history')
  .then((res) => {
    dispatch(adminNotReturnedCount(res.data.count));
  });

export const adminCountCategoryRequest = () => dispatch => axios.get('/api/v1/books/category/history')
  .then((res) => {
    dispatch(adminCountCategory(res.data.count));
  });

export const adminCreateCategoryRequest = category => dispatch => axios.post('/api/v1/books/category', category)
  .then((res) => {
    dispatch(adminCreateCategory(res.data));
  });

/**
 *
 * @export
 * @param {any} image
 * @returns {object} secure url of image save in cloudinary
 */
export function saveImageCloudinary(image) {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  const cloudinaryPreset = process.env.CLOUDINARY_PRESET;
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', cloudinaryPreset);
  return (dispatch) => {
    dispatch(saveImageRequest(image));
    return fetch(cloudinaryUrl, {
      method: 'POST',
      body: data,
    })
      .then((res) => {
        if (res.status >= 400) {
          throw res.statusText;
        } else if (res.status === 200) {
          return res.json();
        }
      })
      .then((response) => {
        console.log(response)
        dispatch(saveImageResponse(response.secure_url));
      }).catch((error) => {
        dispatch(saveImageError('An error occurred'));
      });
  };
}

