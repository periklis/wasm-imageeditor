console.log("Main App");

fetch('imageprocessor.wasm')
    .then(response => response.arrayBuffer())
    .then(buffer => {
        Module.wasmBinary = buffer;

        fetch('imageprocessor.js')
            .then(response => response.blob())
            .then(responseBlob => {
                var script = document.createElement('script'),
                    src = URL.createObjectURL(responseBlob);

                script.src = src;
                script.async = false;
                script.addEventListener('load', () => {
                    var ldw = require('./wasm').loadWasm;

                    /*
                     * This is a bad hack waiting for runtime to load
                     * because of async script loading emscripten stuff
                     */
                    setTimeout(ldw, 100);
                });
                document.body.appendChild(script);
            });
    });
