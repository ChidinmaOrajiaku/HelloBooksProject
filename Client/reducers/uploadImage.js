import { SAVE_IMAGE_SUCCESSFUL, SAVE_IMAGE_FAILED, SAVE_IMAGE_REQUEST } from '../actions/types';

const initialState = [{
  imageData: {},
  response: '',
  error: '',
  hasSaved: ''
}];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_IMAGE_REQUEST:
      return [{
        imageData: action.data,
        response: '',
        error: '',
        hasSaved: ''
      }, ...state];

    case SAVE_IMAGE_SUCCESSFUL:
      return [{
        imageData: {},
        response: action.response,
        error: '',
        hasSaved: true
      }, ...state];

    case SAVE_IMAGE_FAILED:
      return [{
        imageData: {},
        response: '',
        hasSaved: false,
        error: action.error.message,
      }, ...state];

    default: return state;
  }
};
