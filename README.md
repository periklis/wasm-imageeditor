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

## Backlog
- [] Remove boost example code due to licensing issues
- [] Make cmake target build path more webpack friendly without symbolic links
- [x] Replace --preload-file from src/imageprocessor/CMakeLists.txt:7 with file upload
- [] Refactor loadWasm to a more robust bootstrap process for ImageProcessor
- [] Add react-based UI for drawing canvas and graphic manipulation controls
- [] Add Boost/Gil based ImageProcessor API for resize and crop
- [] Refactor lib/* to cmake package system on emscripten toolchain
- [x] Replace WebIDL with embind for better handling of stl containers
