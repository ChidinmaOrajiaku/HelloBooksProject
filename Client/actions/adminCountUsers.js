import axios from 'axios';
import { COUNT_USERS } from './types';

/**
 * @export
 * @param {any} adminCountUsers 
 * @returns {object} object
 */
export function adminCountUsers(adminCountUsers) {
  return {
    type: COUNT_USERS,
    adminCountUsers
  };
}

export const adminCountUserRequest = () => dispatch => axios.get('/api/v1/users/')
  .then((res) => {
    const countUsers = res.data.count;
    localStorage.setItem('countUsers', countUsers);
    dispatch(adminCountUsers(res.data.count));
  });

