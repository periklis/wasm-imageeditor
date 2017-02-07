cmake_minimum_required (VERSION 2.8)
project (WasmImageEditor LANGUAGES CXX)

set(JPEG_LIBRARY "${CMAKE_CURRENT_BINARY_DIR}/lib/jpeg-8d/.libs")
set(JPEG_INCLUDE_DIR "${CMAKE_CURRENT_BINARY_DIR}/lib/jpeg-8d")
set(JPEG_DIR "${JPEG_LIBRARY}/.libs")

set(BOOST_INCLUDE_DIR "${CMAKE_CURRENT_BINARY_DIR}/lib/boost_1_63_0")
set(LIBCXX_INCLUDE_DIR "${EMSCRIPTEN_ROOT_PATH}/system/include/libcxx")

find_package(JPEG)

set(COMMON_CXX_FLAGS "-std=c++14 -Wall -Werror -Wno-c++11-narrowing -Wno-unused-local-typedef -pthread")
set(EM_LINK_FLAGS "--bind -s BINARYEN=1 -s \"BINARYEN_METHOD='native-wasm'\" -s DEMANGLE_SUPPORT=1 -s FORCE_FILESYSTEM=1 -s TOTAL_MEMORY=134217728 -s ASSERTIONS=1")

# Set compile flags for emscripten clang
if(UNIX)
  set(CMAKE_CXX_FLAGS
    "$ENV{CXXFLAGS} -O2 ${COMMON_CXX_FLAGS}")
  set(CMAKE_CXX_FLAGS_RELEASE
    "$ENV{CXXFLAGS} -O2 -fomit-frame-pointer ${COMMON_CXX_FLAGS}")
  set(CMAKE_CXX_FLAGS_DEBUG
    "$ENV{CXXFLAGS} -Og -fno-omit-frame-pointer -g -ggdb ${COMMON_CXX_FLAGS}")
endif()

add_subdirectory("${PROJECT_SOURCE_DIR}/lib")
add_subdirectory("${PROJECT_SOURCE_DIR}/src/imageprocessor")
add_subdirectory("${PROJECT_SOURCE_DIR}/test")
