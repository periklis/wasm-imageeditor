fetch('../build/example.wasm')
    .then(response => response.arrayBuffer())
    .then(buffer => {
        Module.wasmBinary = buffer;

        fetch('../build/example.js')
            .then(response => response.blob())
            .then(responseBlob => {
                var script = document.createElement('script');
                var src = URL.createObjectURL(responseBlob);

                script.src = src;
                script.async = false;
                document.body.appendChild(script);
            });
    });
