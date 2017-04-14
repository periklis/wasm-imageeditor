class ImageProcessor {

  init = () => fetch('imageprocessor.wasm')
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      Module.wasmBinary = buffer;
      Module.postRun = [this.prepare];

      fetch('imageprocessor.js')
        .then((response) => response.blob())
        .then((responseBlob) => {
          var script = document.createElement('script');
          var src = URL.createObjectURL(responseBlob);

          script.src = src;
          script.async = false;
          document.body.appendChild(script);

          return window.FS;
        });
    });

  process = (filename) => {
    var results = {
      dimensions: {x:0, y:0},
      histogram: [],
      objectUrl: ''
    };

    if ('WebAssembly' in window) {
      var ip = new Module.ImageProcessor(filename);

      ip.crop(700, 500, 700, 500);

      var dims = ip.dimensions();
      results.dimensions.x = dims.get('x');
      results.dimensions.y = dims.get('y');

      var histogram = ip.histogram();
      for(var i=0; i < histogram.size();i++){
        results.histogram.push(histogram.get(i));
      }

      ip.delete();

      var file = FS.readFile(filename, {encoding: 'binary'});
      var blob = new Blob([new Uint8Array(file)], {type: 'application/image'});
      results.objectUrl = URL.createObjectURL(blob);

    } else {
      console.log("Your browser doesn't support Web Assembly. You may need " +
                  "to enable it in your browser's flags.");
    }

    return results;
  };

  prepare = () => {
    FS.mkdir('/data');
    FS.mount(IDBFS, {}, '/data');
    FS.syncfs(true, (err) => {if (err) console.log(err);});
  };
}

const processor = new ImageProcessor();
processor.init();

export default processor;
