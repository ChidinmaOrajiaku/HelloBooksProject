import { EDIT_BOOK_ID } from './types';


/**
   * Id of book to be edited
   * @export editBookIdRequest
   *
   * @param {object} bookId
   *
   * @returns {object} of book Id
   */
export function editBookIdRequest(bookId) {
  return {
    type: EDIT_BOOK_ID,
    bookId
  };
}
