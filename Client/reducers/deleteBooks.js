import { DELETE_BOOKS_SUCCESSFUL, DELETE_BOOKS_FAILED } from '../actions/types';

const initialState = [{
  deleteData: {},
  response: '',
  error: '',
  isDeleted: ''
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DELETE_BOOKS_SUCCESSFUL:
      return [{
        deleteData: {},
        response: action.response,
        error: '',
        isDeleted: true
      }, ...state];

    case DELETE_BOOKS_FAILED:
      return [{
        deleteData: {},
        response: '',
        error: action.error,
        isDeleted: false
      }, ...state];

    default: return state;
  }
};
