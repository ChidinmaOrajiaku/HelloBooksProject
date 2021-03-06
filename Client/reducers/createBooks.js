import { CREATE_BOOKS_SUCCESSFUL, CREATE_BOOKS_FAILED } from '../actions/types';

const initialState = [{
  createData: {},
  response: '',
  error: '',
  isAdded: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_BOOKS_SUCCESSFUL:
      return [{
        createData: {},
        response: action.response,
        error: '',
        isAdded: true,
      }, ...state];

    case CREATE_BOOKS_FAILED:
      return [{
        createData: {},
        response: '',
        error: action.error,
        isAdded: false,
      }, ...state];

    default: return state;
  }
};
