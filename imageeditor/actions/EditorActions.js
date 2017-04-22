export const SAVE_IMAGE = 'SAVE_IMAGE';
export const RESIZE_IMAGE = 'RESIZE_IMAGE';
export const ZOOM_IMAGE = 'ZOOM_IMAGE';

export const resizeImage = (image) => ({
  type: RESIZE_IMAGE,
  ...image
});

export const saveImage = (image) => ({
  type: SAVE_IMAGE,
  ...image
});

export const zoomImage = (image) => ({
  type: ZOOM_IMAGE,
  ...image
});
