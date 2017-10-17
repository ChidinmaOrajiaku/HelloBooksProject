import { CREATE_BOOKS_SUCCESSFUL, CREATE_BOOKS_FAILED, CREATE_BOOKS_REQUEST } from '../actions/types';

const initialState = [{
  createData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_BOOKS_REQUEST:
      return [{
        createData: action.data,
        response: '',
        error: '',
      }, ...state];

    case CREATE_BOOKS_SUCCESSFUL:
      return [{
        createData: {},
        response: action.response,
        error: '',
      }, ...state];

    case CREATE_BOOKS_FAILED:
      return [{
        createData: {},
        response: '',
        error: action.error,
      }, ...state];

    default: return state;
  }
};
