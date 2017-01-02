console.log("Main App");
var loadWasm = require('./wasm').loadWasm;

fetch('imageprocessor.wasm')
    .then(response => response.arrayBuffer())
    .then(buffer => {
        Module.wasmBinary = buffer;
        Module.postRun = [loadWasm];

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
