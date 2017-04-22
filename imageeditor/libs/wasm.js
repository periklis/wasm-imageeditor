class WasmImageProcessor {

  prepare = () => {
    FS.mkdir('/data');
    FS.mount(IDBFS, {}, '/data');
    FS.syncfs(true, () => {});
  };

  resize = (filename, width, height) => {
    const targetFilename = '/data/resized.jpg';
    this.preProcess(filename, targetFilename);

    const ip = new Module.ImageProcessor(targetFilename);

    ip.crop(0, 0, width, height);

    const results = this.postProcess(
      targetFilename,
      ip.dimensions(),
      ip.histogram()
    );

    ip.delete();

    return results;
  };

  zoom = (filename, zoomFactor) => {
    const targetFilename = '/data/resized.jpg';
    this.preProcess(filename, targetFilename);

    const ip = new Module.ImageProcessor(targetFilename);
    const dims = ip.dimensions();
    const newWidth = dims.get('x') * (zoomFactor/100);
    const newHeight = dims.get('y') * (zoomFactor/100);

    ip.crop(0, 0, newWidth, newHeight);

    const results = this.postProcess(
      targetFilename,
      ip.dimensions(),
      ip.histogram()
    );

    ip.delete();

    return results;
  }

  save = (buffer, filename) => {
    FS.writeFile(
      filename,
      new Uint8Array(buffer),
      {encoding: 'binary'}
    );

    const ip = new Module.ImageProcessor(filename);
    const results = this.postProcess(filename, ip.dimensions(), ip.histogram());
    ip.delete();

    return results;
  }

  preProcess = (sourceFilename, targetFilename) => {
    FS.writeFile(
      targetFilename,
      FS.readFile(sourceFilename, {encoding: 'binary'}),
      {encoding: 'binary'}
    );
  }

  postProcess = (filename, dimensions, histogram) => {
    let results = {
      dimensions: {width:0, height:0},
      histogram: [],
      objectUrl: ''
    };

    results.dimensions.width = dimensions.get('x');
    results.dimensions.height = dimensions.get('y');

    for(var i=0; i < histogram.size();i++){
      results.histogram.push(histogram.get(i));
    }

    const file = FS.readFile(filename, {encoding: 'binary'});
    const blob = new Blob([new Uint8Array(file)], {type: 'application/image'});
    results.objectUrl = URL.createObjectURL(blob);

    return results;
  }
}

const processor = new WasmImageProcessor();

export default processor;
