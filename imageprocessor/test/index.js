fetch('../../build/imageprocessor-test.wasm')
    .then(response => response.arrayBuffer())
    .then(buffer => {
        Module.wasmBinary = buffer;

        fetch('../../build/imageprocessor-test.js')
            .then(response => response.blob())
            .then(responseBlob => {
                var script = document.createElement('script');
                var src = URL.createObjectURL(responseBlob);

                script.src = src;
                script.async = false;
                document.body.appendChild(script);
            });
    });
