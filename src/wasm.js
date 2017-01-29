exports.loadWasm = function (filename) {

    if ('WebAssembly' in window) {
        var ip = new Module.ImageProcessor(filename);
        var dims = ip.dimensions();
        console.log(dims);

        var hg = ip.histogram();
        console.log(hg);

        ip.delete();

    } else {
        console.log("Your browser doesn't support Web Assembly. You may need " +
                    "to enable it in your browser's flags.");
    }
};

exports.makeFs = function() {
    FS.mkdir('/data');
    FS.mount(IDBFS, {}, '/data');
    FS.syncfs(true, function (err) {
        if (err)
            console.log(err);
    });
};
