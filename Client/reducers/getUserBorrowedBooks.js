import { GET_USER_BORROWED_SUCCESSFUL, GET_USER_BORROWED_FAILED } from '../actions/types';

const initialState = [{
  userBorrowedData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_BORROWED_SUCCESSFUL:
      return [{
        userBorrowedData: {},
        response: action.response,
        error: '',
      }, ...state];

    case GET_USER_BORROWED_FAILED:
      return [{
        userBorrowedData: {},
        response: '',
        error: action.error,
      }, ...state];

    default: return state;
  }
};
