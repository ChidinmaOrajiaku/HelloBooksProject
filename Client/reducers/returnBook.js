import { RETURN_BOOK_SUCCESSFUL, RETURN_BOOK_FAILED } from '../actions/types';

const initialState = [{
  returnData: {},
  response: '',
  error: '',
  hasReturned: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case RETURN_BOOK_SUCCESSFUL:
      return [{
        returnData: {},
        response: action.response,
        error: '',
        hasReturned: true,
      }, ...state];

    case RETURN_BOOK_FAILED:
      return [{
        returnData: {},
        response: '',
        error: action.error,
        hasReturned: false,
      }, ...state];

    default: return state;
  }
};
