import {RESIZE_IMAGE, SAVE_IMAGE, ZOOM_IMAGE} from 'Actions';

const initialState = {
  dimensions: {
    width: 0,
    height: 0
  },
  histogram: [],
  imageSrc: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
  case RESIZE_IMAGE:
  case SAVE_IMAGE:
  case ZOOM_IMAGE:
    return {
      dimensions: action.dimensions,
      histogram: action.histogram,
      imageSrc: action.imageSrc
    };
  default:
    return state;
  }
};
