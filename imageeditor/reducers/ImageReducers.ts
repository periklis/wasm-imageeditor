import { RESIZE_IMAGE, SAVE_IMAGE, ZOOM_IMAGE } from "../actions";

const initialState = {
  dimensions: {
    height: 0,
    width: 0,
  },
  histogram: [] as number[],
  imageSrc: "",
};

export default (state: IImage = initialState, action: IImageAction) => {
  switch (action.type) {
    case RESIZE_IMAGE:
    case SAVE_IMAGE:
    case ZOOM_IMAGE:
      return {
        dimensions: action.dimensions,
        histogram: action.histogram,
        imageSrc: action.imageSrc,
      };
    default:
      return state;
  }
};
