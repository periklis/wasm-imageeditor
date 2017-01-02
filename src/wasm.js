exports.loadWasm = function (Module) {

    if ('WebAssembly' in window) {
        var im = new Module.ImageProcessor();

        im.dims();

        im.histogramm();

    } else {
        console.log("Your browser doesn't support Web Assembly. You may need " +
                    "to enable it in your browser's flags.");
    }
};
