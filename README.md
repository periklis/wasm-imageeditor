# WebAssembly & Webpack based ImageEditor

## Build
```
mkdir build
cd build
cmake -DCMAKE_TOOLCHAIN_FILE=/PATH/TO/emsdk_portable/emscripten/incoming/cmake/Modules/Platform/Emscripten.cmake \
      -DCMAKE_BUILD_TYPE=YOUR_BUILD_TYPE_HERE \
      ../
make
```

## Run
Development:
```
npm run start
```

Production:
```
npm run build
npm run server
```

Open http://localhost:8080/ in your browser and check console in Web Developer Tools.

## Backlog
- [x] Remove boost example code due to licensing issues
- [x] Make cmake target build path more webpack friendly without symbolic links
- [x] Replace --preload-file from src/imageprocessor/CMakeLists.txt:7 with file upload
- [x] Refactor loadWasm to a more robust bootstrap process for ImageProcessor
- [ ] Add react-based UI for drawing canvas and graphic manipulation controls
- [x] Add Boost/Gil based ImageProcessor API for resize and crop
- [ ] Re-enable ImageProcessor::resize when solution for boost::gil numeric extension found
- [x] Refactor lib/* to cmake package system on emscripten toolchain
- [x] Replace WebIDL with embind for better handling of stl containers
- [x] Add googletest framework for testing c++ code
- [x] Add continuous integration with ctest, nodejs emulator on asmjs
