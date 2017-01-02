#!/bin/sh

#
# Setup llvm new webassembly backend toolchain
#
LLVM=~/Projects/github/llvm/build/bin
CLANG=$LLVM/clang++
LLVM_LLC=$LLVM/llc
LLVM_LINK=$LLVM/llvm-link
LLVM_OPT_LEVEL="-O0"

#
# Setup binaryen webassmbly infrastructure
#
BINARYEN=~/Projects/github/binaryen/build/bin
S2WASM=$BINARYEN/s2wasm
WASMAS=$BINARYEN/wasm-as

if [ $VERBOSE ]
then
    CLANG="${CLANG} -v"
    LLVM_LINK="${LLVM_LINK} -v"
fi

if [ $DEBUG ]
then
    S2WASM="${S2WASM} -d"
    WASMAS="${WASMAS} -d"
fi

#
# Emscripten Preprocessor definitions
#
CPPFLAGS="-D__EMSCRIPTEN_major__=1 \
          -D__EMSCRIPTEN_minor__=37 \
          -D__EMSCRIPTEN_tiny__=1 \
          -D_LIBCPP_ABI_VERSION=2 \
          -D__EMSCRIPTEN__ \
          -Dunix -D__unix -D__unix__"

#
# cxxflags and search paths
#
CXXFLAGS="-std=c++14 \
          -Wall -Werror -Wno-c++11-narrowing -Wno-unused-local-typedef \
          -Xclang -nobuiltininc -Xclang -nostdsysteminc \
          -pthread -emit-llvm --target=wasm32 -S"

SEARCH_PATHS="-Xclang -isystem/Users/periklis/Projects/emsdk_portable/emscripten/incoming/system/include/libcxx \
              -Xclang -isystem/Users/periklis/Projects/emsdk_portable/emscripten/incoming/system/lib/libcxxabi/include \
              -Xclang -isystem/Users/periklis/Projects/emsdk_portable/emscripten/incoming/system/include/compat \
              -Xclang -isystem/Users/periklis/Projects/emsdk_portable/emscripten/incoming/system/include \
              -Xclang -isystem/Users/periklis/Projects/emsdk_portable/emscripten/incoming/system/include/SSE \
              -Xclang -isystem/Users/periklis/Projects/emsdk_portable/emscripten/incoming/system/include/libc \
              -Xclang -isystem/Users/periklis/Projects/emsdk_portable/emscripten/incoming/system/lib/libc/musl/arch/emscripten \
              -Xclang -isystem/Users/periklis/Projects/emsdk_portable/emscripten/incoming/system/local/include \
              -I /Users/periklis/Projects/emsdk_portable/emscripten/incoming/system/include \
              -I /Users/periklis/Projects/boost_1_63_0 \
              -I ../../lib/jpeg-8d \
              -I ../../build/lib/jpeg-8d"

#
# LLVM WebAssembly Backend flags
#
LLVM_LLC_FLAGS="-march=wasm32 -thread-model=single -combiner-global-alias-analysis=false -enable-emscripten-cxx-exceptions -enable-emscripten-sjlj"

#
# Binayern s2wasm flags
#
S2WASM_FLAGS="--emscripten-glue --global-base=1024 --initial-memory=16777216 -l /Users/periklis/.emscripten_cache/wasm/wasm_compiler_rt.a"

#
# Compile source to single bitcode files
#
$CLANG glue.cpp $CPPFLAGS $CXXFLAGS ${LLVM_OPT_LEVEL} $SEARCH_PATHS
$CLANG image.cpp $CPPFLAGS $CXXFLAGS ${LLVM_OPT_LEVEL} $SEARCH_PATHS

#
# Link to single bitcode file
#
$LLVM_LINK image.ll glue.ll -o combined.ll

#
# Compile bitcode to march native assembler
#
$LLVM_LLC combined.ll $LLVM_LLC_FLAGS ${LLVM_OPT_LEVEL}

#
# Transform march native assembler to webassmbly binary encoding
#
$S2WASM $S2WASM_FLAGS combined.s > combined.wast
#$WASMAS combined.wast -o combined.wasm
