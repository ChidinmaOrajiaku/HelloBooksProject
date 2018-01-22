import { SIGN_UP_FAILED } from '../actions/types';

const initialState = [{
  error: '',
  isSignedUp: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGN_UP_FAILED:
      return [{
        error: action.error,
        isSignedUp: false,
      }, ...state];

    default: return state;
  }
};
