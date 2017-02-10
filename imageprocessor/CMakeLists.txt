cmake_minimum_required (VERSION 3.2 FATAL_ERROR)
project (ImageProcessorModule)

#
# Set this because we cross-compile with emscripten and we need to make sure
# that we find our emscripten built boost as static library
#
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE BOTH)

find_package(Boost 1.63.0 REQUIRED)
find_package(JPEG REQUIRED)

set(EM_LINK_FLAGS "-s BINARYEN=1 -s DEMANGLE_SUPPORT=1 -s FORCE_FILESYSTEM=1 -s TOTAL_MEMORY=134217728")

#
# Module
#
add_library(imageprocessor-lib src/imageprocessor.cpp)

set_target_properties(imageprocessor-lib PROPERTIES
  CXX_STANDARD 14
  LINK_FLAGS ${EM_LINK_FLAGS})

target_compile_options(imageprocessor-lib
  PUBLIC -Wall -Werror -Wno-c++11-narrowing
  PUBLIC -Wno-unused-local-typedef -pthread)

target_include_directories(imageprocessor-lib
  PUBLIC ${JPEG_INCLUDE_DIR} ${JPEG_CONFIG_DIR}
  PUBLIC ${Boost_INCLUDE_DIR}
  INTERFACE ${CMAKE_CURRENT_SOURCE_DIR}/src)

target_link_libraries(imageprocessor-lib PRIVATE ${JPEG_LIBRARY}/libjpeg.dylib)

#
# Executable for bindings
#
add_executable(imageprocessor src/imageprocessor-bindings.cpp)
set_target_properties(imageprocessor PROPERTIES
  ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}
  RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}
  LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}
  CXX_STANDARD 14
  LINK_FLAGS "${EM_LINK_FLAGS} --bind -s \"BINARYEN_METHOD='native-wasm'\"")

target_link_libraries(imageprocessor PRIVATE imageprocessor-lib)

#
# Tests
#
add_executable(imageprocessor-test test/imageprocessor-test.cpp)

set_target_properties(imageprocessor-test PROPERTIES
  CXX_STANDARD 14
  LINK_FLAGS "${EM_LINK_FLAGS} -s \"BINARYEN_METHOD='asmjs'\" -s DISABLE_EXCEPTION_CATCHING=0 -s ASSERTIONS=1")

target_link_libraries(imageprocessor-test imageprocessor-lib gtest_main)
add_test(NAME imageprocessor-test COMMAND imageprocessor-test)
