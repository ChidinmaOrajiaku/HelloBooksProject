import axios from 'axios';
import {
  GET_BOOKS_COUNT,
  GET_RENTED_BOOKS_COUNT,
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
  const countBooks = res.data.count;
  localStorage.setItem('countBooks', countBooks);
  dispatch(adminCount(res.data.count));
});

export const adminCountRentedBooksRequest = () => dispatch => axios.get('/api/v1/users/history')
  .then((res) => {
    const countRentedBooks = res.data.count;
    localStorage.setItem('countRentedBooks', countRentedBooks);
    dispatch(adminRentedCount(res.data.count));
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
        dispatch(saveImageResponse(response.secure_url));
      }).catch((error) => {
        dispatch(saveImageError(error));
      });
  };
}

