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
                document.body.appendChild(script);
            });
    });
