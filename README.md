# WebAssembly & Webpack based ImageEditor

## Build
```
mkdir build
cd build
cmake -DCMAKE_TOOLCHAIN_FILE=/PATH/TO/emsdk_portable/emscripten/incoming/cmake/Modules/Platform/Emscripten.cmake ../
make
ln -s src/imageprocessor.js
ln -s src/imageprocessor.data
ln -s src/imageprocessor.wasm
```

## Run
### Browser
``` open http://localhost:9000/

## TODO
- Add missing licensing info, due to boost example usage
