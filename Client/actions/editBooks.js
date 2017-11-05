import { EDIT_BOOK_ID } from './types';


/**
   * 
   * 
   * @export
   * @param {any} bookId
   * @returns {object} get book Id
   */
export function editBookIdRequest(bookId) {
  return {
    type: EDIT_BOOK_ID,
    bookId
  };
}
