import axios from 'axios';
import {
  GET_BOOKS_COUNT,
  GET_RENTED_BOOKS_COUNT,
  GET_NOT_RETURNED_BOOKS_COUNT,
  CREATE_CATEGORY_SUCCESSFUL,
  CREATE_CATEGORY_FAILED,
  GET_CATEGORY_COUNT,
  SAVE_IMAGE_FAILED,
  SAVE_IMAGE_SUCCESSFUL,
  SAVE_IMAGE_REQUEST,
} from './types';


/**
 * Counts books
 * @export adminCount
 *
 * @param {object} books
 *
 * @returns {object} of books
 */
export function adminCount(books) {
  return {
    type: GET_BOOKS_COUNT,
    books
  };
}

/**
 * Counts rented books
 * @export adminRentedCount
 *
 * @param {object} rentedBooks
 *
 * @returns {object} of rented books
 */
export function adminRentedCount(rentedBooks) {
  return {
    type: GET_RENTED_BOOKS_COUNT,
    rentedBooks
  };
}

/**
 * Counts not rented books
 * @export adminNotReturnedCount
 *
 * @param {object} notReturnedBooks
 *
 * @returns {object} of not returned books
 */
export function adminNotReturnedCount(notReturnedBooks) {
  return {
    type: GET_NOT_RETURNED_BOOKS_COUNT,
    notReturnedBooks
  };
}

/**
 * Creates category
 * @export adminCreateCategory
 *
 * @param {object} category
 *
 * @returns {object} of category
 */
export function adminCreateCategory(category) {
  return {
    type: CREATE_CATEGORY_SUCCESSFUL,
    category
  };
}

/**
 *  Returns error if action to category fails
 * @export adminCreateCategoryFailed
 *
 * @param {object} error
 *
 * @returns {object} of category
 */
export function adminCreateCategoryFailed(error) {
  return {
    type: CREATE_CATEGORY_FAILED,
    error
  };
}

/**
 * Counts category
 * @export adminCountCategory
 *
 * @param {object} categoryCount
 *
 * @returns {object} of categoryCount
 */
export function adminCountCategory(categoryCount) {
  return {
    type: GET_CATEGORY_COUNT,
    categoryCount
  };
}

/**
 * Save image response
 * @export saveImageResponse
 *
 * @param {object} response
 *
 * @returns {object} of image saved
 */
export function saveImageResponse(response) {
  return {
    type: SAVE_IMAGE_SUCCESSFUL,
    response
  };
}

/**
 * Dispatches image data for saving
 * @export saveImageRequest
 *
 * @param {object} data
 *
 * @returns {object} of image data request
 */
export function saveImageRequest(data) {
  return {
    type: SAVE_IMAGE_REQUEST,
    data
  };
}

/**
 * Dispatches error if image fails to save
 * @export saveImageError
 *
 * @param {object} error
 *
 * @returns {object} of image failed
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
    setTimeout(() => {
      dispatch(adminCountCategoryRequest());
    }, 1500);
  }).catch((error) => {
    dispatch(adminCreateCategoryFailed(error));
  });

/**
 * Saves image to cloudinary
 * @export saveImageCloudinary
 *
 * @param {object} image
 *
 * @returns {object} of secure url of image save in cloudinary
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
        dispatch(saveImageResponse(response.secure_url));
      }).catch((error) => {
        dispatch(saveImageError('An error occurred'));
      });
  };
}

