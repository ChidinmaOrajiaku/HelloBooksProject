import { EDIT_BOOK_ID } from './types';


/**
   * 
   * 
   * @export
   * @param {any} bookId
   * @returns {editBookId} editbookId
   */
export function editBookIdRequest(bookId) {
  return {
    type: EDIT_BOOK_ID,
    bookId
  };
}
