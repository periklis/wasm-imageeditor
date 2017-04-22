import WasmImageProcessor from 'Libs/wasm.js';

export const IMAGE_SAVE = 'IMAGE_SAVE';
export const IMAGE_RESIZE = 'IMAGE_RESIZE';
export const IMAGE_ZOOM = 'IMAGE_ZOOM';

export function resizeImage (filename, value) {

  const results = WasmImageProcessor.resize(filename, value.width, value.height);

  return {
    type: IMAGE_RESIZE,
    dimensions: results.dimensions,
    histogram: results.histogram,
    imageSrc: results.objectUrl
  };
}

export function saveImage(buffer, filename) {
  const results = WasmImageProcessor.save(buffer, filename);

  return {
    type: IMAGE_SAVE,
    dimensions: results.dimensions,
    histogram: results.histogram,
    imageSrc: results.objectUrl
  };
}

export function zoomImage (filename, zoomFactor) {
  const results = WasmImageProcessor.zoom(filename, zoomFactor);

  return {
    type: IMAGE_ZOOM,
    dimensions: results.dimensions,
    histogram: results.histogram,
    imageSrc: results.objectUrl
  };
}
