import { SAVE_IMAGE_SUCCESSFUL, SAVE_IMAGE_FAILED, SAVE_IMAGE_REQUEST } from '../actions/types';

const initialState = [{
  imageData: {},
  response: '',
  error: '',
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_IMAGE_REQUEST:
      return [{
        imageData: action.data,
        response: '',
        error: '',
      }, ...state];

    case SAVE_IMAGE_SUCCESSFUL:
      return [{
        imageData: {},
        response: action.response,
        error: '',
      }, ...state];

    case SAVE_IMAGE_FAILED:
      return [{
        imageData: {},
        response: '',
        error: action.error,
      }, ...state];

    default: return state;
  }
};
