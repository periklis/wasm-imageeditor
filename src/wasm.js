exports.loadWasm = function (uri, Module) {

    if ('WebAssembly' in window) {
        Module.preRun = function () {
            fetch(uri)
                .then(response => response.arrayBuffer())
                .then(buffer => {
                    Module['wasmBinary'] = buffer;
                });
        };



    } else {
        console.log("Your browser doesn't support Web Assembly. You may need " +
                    "to enable it in your browser's flags.");
    }
};
