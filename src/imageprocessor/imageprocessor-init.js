var Module = {
    'print': function (text) {
        console.log('MODULE: ' + text);
    },
    'preInit': [function () {
        fetch('imageprocessor.wasm')
            .then(response => response.arrayBuffer())
            .then(buffer => {
                Module.wasmBinary = buffer;
            });
    }]
};
