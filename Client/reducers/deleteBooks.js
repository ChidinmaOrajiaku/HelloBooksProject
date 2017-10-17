import { DELETE_BOOKS_SUCCESSFUL, DELETE_BOOKS_FAILED, DELETE_BOOKS_REQUEST } from '../actions/types';

const initialState = [{
  deleteData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DELETE_BOOKS_REQUEST:
      return [{
        deleteData: action.data,
        response: '',
        error: '',
      }, ...state];

    case DELETE_BOOKS_SUCCESSFUL:
      return [{
        deleteData: {},
        response: action.response,
        error: '',
      }, ...state];

    case DELETE_BOOKS_FAILED:
      return [{
        deleteData: {},
        response: '',
        error: action.error,
      }, ...state];

    default: return state;
  }
};
