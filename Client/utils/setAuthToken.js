import axios from 'axios';

/**
 * 
 * Set jwt token in request headers else delete token from request headers
 * @export
 * @param {token} token 
 * @returns {object} response object
 */
export default function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['x-token'] = `${token}`;
  } else {
    delete axios.defaults.headers.common['x-token'];
  }
}
