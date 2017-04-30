export const SAVE_IMAGE = 'SAVE_IMAGE';
export const RESIZE_IMAGE = 'RESIZE_IMAGE';
export const ZOOM_IMAGE = 'ZOOM_IMAGE';

export const resizeImage = (image: IImage) => ({
  type: RESIZE_IMAGE,
  ...image
});

export const saveImage = (image: IImage) => ({
  type: SAVE_IMAGE,
  ...image
});

export const zoomImage = (image: IImage) => ({
  type: ZOOM_IMAGE,
  ...image
});
