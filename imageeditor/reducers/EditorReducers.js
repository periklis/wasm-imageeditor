import {IMAGE_RESIZE, IMAGE_SAVE, IMAGE_ZOOM} from 'Actions';

const defaultEditorState = {
  dimensions: {
    width: 0,
    height: 0
  },
  histogram: [],
  imageSrc: ''
};

export default function editor(state = defaultEditorState, action) {
  switch(action.type) {
  case IMAGE_RESIZE:
  case IMAGE_SAVE:
  case IMAGE_ZOOM:
    return {
      dimensions: action.dimensions,
      histogram: action.histogram,
      imageSrc: action.imageSrc
    };
  default:
    return state;
  }
}
