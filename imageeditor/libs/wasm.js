class WasmImageProcessor {

  prepare = () => {
    FS.mkdir('/data');
    FS.mount(IDBFS, {}, '/data');
    FS.syncfs(true, () => {});
  };

  resize = (filename, width, height) => {
    const targetFilename = '/data/resized.jpg';

    let results = {
      dimensions: {x:0, y:0},
      histogram: [],
      objectUrl: ''
    };

    FS.writeFile(
      targetFilename,
      FS.readFile(filename, {encoding: 'binary'}),
      {encoding: 'binary'}
    );

    const ip = new Module.ImageProcessor(targetFilename);

    ip.crop(0, 0, width, height);

    const dims = ip.dimensions();
    results.dimensions.x = dims.get('x');
    results.dimensions.y = dims.get('y');

    const histogram = ip.histogram();
    for(var i=0; i < histogram.size();i++){
      results.histogram.push(histogram.get(i));
    }

    ip.delete();

    const file = FS.readFile(targetFilename, {encoding: 'binary'});
    const blob = new Blob([new Uint8Array(file)], {type: 'application/image'});
    results.objectUrl = URL.createObjectURL(blob);

    return results;
  };

  zoom = (filename, zoomFactor) => {
    const targetFilename = '/data/resized.jpg';

    let results = {
      dimensions: {x:0, y:0},
      histogram: [],
      objectUrl: ''
    };

    FS.writeFile(
      targetFilename,
      FS.readFile(filename, {encoding: 'binary'}),
      {encoding: 'binary'}
    );

    const ip = new Module.ImageProcessor(targetFilename);
    const dims = ip.dimensions();
    const newWidth = dims.get('x') * (zoomFactor/100);
    const newHeight = dims.get('y') * (zoomFactor/100);

    ip.crop(0, 0, newWidth, newHeight);

    const newDims = ip.dimensions();
    results.dimensions.x = newDims.get('x');
    results.dimensions.y = newDims.get('y');

    const histogram = ip.histogram();
    for(var i=0; i < histogram.size();i++){
      results.histogram.push(histogram.get(i));
    }

    ip.delete();

    const file = FS.readFile(targetFilename, {encoding: 'binary'});
    const blob = new Blob([new Uint8Array(file)], {type: 'application/image'});
    results.objectUrl = URL.createObjectURL(blob);

    return results;
  }

  save = (buffer, filename) => {
    let results = {
      dimensions: {x:0, y:0},
      histogram: [],
      objectUrl: ''
    };

    FS.writeFile(
      filename,
      new Uint8Array(buffer),
      {encoding: 'binary'}
    );

    const ip = new Module.ImageProcessor(filename);

    const dims = ip.dimensions();
    results.dimensions.x = dims.get('x');
    results.dimensions.y = dims.get('y');

    const histogram = ip.histogram();
    for(var i=0; i < histogram.size();i++){
      results.histogram.push(histogram.get(i));
    }

    ip.delete();

    const file = FS.readFile(filename, {encoding: 'binary'});
    const blob = new Blob([new Uint8Array(file)], {type: 'application/image'});
    results.objectUrl = URL.createObjectURL(blob);

    return results;
  }
}

const processor = new WasmImageProcessor();

export default processor;
