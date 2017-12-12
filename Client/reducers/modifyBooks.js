import { MODIFY_BOOKS_SUCCESSFUL, MODIFY_BOOKS_FAILED, MODIFY_BOOKS_REQUEST } from '../actions/types';

const initialState = [{
  modifyData: {},
  response: '',
  error: '',
  isModified: ''
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case MODIFY_BOOKS_REQUEST:
      return [{
        modifyData: action.data,
        response: '',
        error: '',
      }, ...state];

    case MODIFY_BOOKS_SUCCESSFUL:
      return [{
        modifyData: {},
        response: action.response,
        error: '',
        isModified: true
      }, ...state];

    case MODIFY_BOOKS_FAILED:
      return [{
        modifyData: {},
        response: '',
        error: action.error,
        isModified: false
      }, ...state];

    default: return state;
  }
};
