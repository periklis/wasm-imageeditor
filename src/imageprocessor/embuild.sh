#!/bin/sh

OPT_LEVEL="-O2"

EMCC="em++"

if [ $VERBOSE ]
then
    EMCC="${EMCC} -v"
fi

CXXFLAGS="-std=c++14 -Wall -Werror -Wno-c++11-narrowing -Wno-unused-local-typedef -pthread"

SEARCH_PATHS="-I /Users/periklis/Projects/boost_1_63_0 \
              -I ../../lib/jpeg-8d \
              -I ../../build/lib/jpeg-8d"

EMFLAGS="-s BINARYEN=1 -s BINARYEN_METHOD='native-wasm' -s DEMANGLE_SUPPORT=1"

EMLDFLAGS="--post-js glue.js --embed-file test.jpg"

$EMCC image.cpp -o image.bc $CXXFLAGS $OPT_LEVEL $SEARCH_PATHS $EMFLAGS
$EMCC glue.cpp -o glue.bc $CXXFLAGS $OPT_LEVEL $SEARCH_PATHS $EMFLAGS
$EMCC image.bc glue.bc -o imageprocessing-wasm.bc $CXXFLAGS $OPT_LEVEL $SEARCH_PATHS $EMFLAGS
$EMCC imageprocessing-wasm.bc ../../lib/jpeg-8d-build/.libs/libjpeg.dylib -o imageprocessing-wasm.js $CXXFLAGS $OPT_LEVEL $SEARCH_PATHS $EMFLAGS $EMLDFLAGS
