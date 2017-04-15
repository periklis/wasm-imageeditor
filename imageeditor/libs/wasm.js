class WasmImageProcessor {

  prepare = () => {
    FS.mkdir('/data');
    FS.mount(IDBFS, {}, '/data');
    FS.syncfs(true, () => {});
  };

  process = (buffer, filename) => {
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

    if ('WebAssembly' in window) {
      const ip = new Module.ImageProcessor(filename);

      ip.crop(700, 500, 700, 500);

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

    }

    return results;
  };
}

const processor = new WasmImageProcessor();

export default processor;
