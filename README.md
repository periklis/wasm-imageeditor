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
Open http://localhost:9000/ in your browser and check console in Web Developer Tools.

## TODO
- Add missing licensing info, due to boost example usage
