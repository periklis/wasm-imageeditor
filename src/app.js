console.log("Main App");
var loadWasm = require('./wasm').loadWasm;
var makeFs = require('./wasm').makeFs;

exports.uploadFile = function (files) {
    files.forEach(file => {
        fetch(file.preview)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                var view = new Uint8Array(buffer);

                FS.writeFile(
                    '/data/test.jpg',
                    view,
                    {encoding: 'binary'}
                );
                FS.syncfs(true, err => console.log(err));
                loadWasm();
            });
    });

    return false;
};

fetch('imageprocessor.wasm')
    .then(response => response.arrayBuffer())
    .then(buffer => {
        Module.wasmBinary = buffer;
        Module.postRun = [makeFs];

        fetch('imageprocessor.js')
            .then(response => response.blob())
            .then(responseBlob => {
                var script = document.createElement('script');
                var src = URL.createObjectURL(responseBlob);

                script.src = src;
                script.async = false;
                document.body.appendChild(script);
            });
    });
