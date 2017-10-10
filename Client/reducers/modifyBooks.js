import { MODIFY_BOOKS_SUCCESSFUL, MODIFY_BOOKS_FAILED, MODIFY_BOOKS_REQUEST } from '../actions/types';

const initialState = [{
  modifyData: {},
  response: '',
  error: '',
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
      }, ...state];

    case MODIFY_BOOKS_FAILED:
      return [{
        modifyData: {},
        response: '',
        error: action.error,
      }, ...state];

    default: return state;
  }
};
