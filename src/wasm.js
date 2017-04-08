exports.processImage = function (filename) {
    var results = {
        dimensions: {x:0, y:0},
        histogram: [],
        objectUrl: ''
    };

    if ('WebAssembly' in window) {
        var ip = new Module.ImageProcessor(filename);

        ip.crop(700, 500, 700, 500);

        var dims = ip.dimensions();
        results.dimensions.x = dims.get('x');
        results.dimensions.y = dims.get('y');

        var histogram = ip.histogram();
        for(var i=0; i < histogram.size();i++){
            results.histogram.push(histogram.get(i));
        }

        ip.delete();

        var file = FS.readFile(filename, {encoding: 'binary'});
        var blob = new Blob([new Uint8Array(file)], {type: 'application/image'});
        results.objectUrl = URL.createObjectURL(blob);


    } else {
        console.log("Your browser doesn't support Web Assembly. You may need " +
                    "to enable it in your browser's flags.");
    }

    return results;
};

exports.makeFs = function() {
    FS.mkdir('/data');
    FS.mount(IDBFS, {}, '/data');
    FS.syncfs(true, function (err) {
        if (err)
            console.log(err);
    });
};
