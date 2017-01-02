# webassembly

## Build
``` 
mkdir build
cd build
cmake -DCMAKE_TOOLCHAIN_FILE=/PATH/TO/emsdk_portable/emscripten/incoming/cmake/Modules/Platform/Emscripten.cmake ../
make
cd src/imageprocessing-wasm/
cp ../../../src/imageprocessing-wasm/test.jpg . 
em++ imageprocessing-wasm.bc ../../lib/jpeg-8d/.libs/libjpeg.dylib -o imageprocessing-wasm.html -s DEMANGLE_SUPPORT=1 --post-js ../../../src/imageprocessing-wasm/glue.js --embed-file test.jpg --emrun -s BINARYEN=1 -s "BINARYEN_METHOD='native-wasm'" 
```

## Run
### Graph example
``` emrun --browser=chrome_canary build/src/graph-wasm/graph-wasm.html ```
### Image-Processing example
``` emrun --browser=chrome_canary build/src/imageprocessing-wasm/imageprocessing-wasm.html ```

## TODO
- Integrate last em++ in cmake build system
- Add missing licensing info, due to boost example usage

## Disclaimer
Highly experimental package for evaluation purposes of native webassembly with boost libraries (e.g. Boost BGL, Boost GIL)
