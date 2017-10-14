import { USER_BORROWED_SUCCESSFUL, USER_BORROWED_FAILED, USER_BORROWED_REQUEST } from '../actions/types';

const initialState = [{
  userBorrowedData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_BORROWED_REQUEST:
      return [{
        userBorrowedData: action.data,
        response: '',
        error: '',
      }, ...state];

    case USER_BORROWED_SUCCESSFUL:
      return [{
        userBorrowedData: {},
        response: action.response,
        error: '',
      }, ...state];

    case USER_BORROWED_FAILED:
      return [{
        userBorrowedData: {},
        response: '',
        error: action.error.response.data.errors[0].message,
      }, ...state];

    default: return state;
  }
};
