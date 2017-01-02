cmake_minimum_required (VERSION 2.8)
project (ImageProcessorModule)

file(GLOB postJsFiles *post.js)

set(COMMON_CXX_FLAGS "-std=c++14 -Wall -Werror -Wno-c++11-narrowing -Wno-unused-local-typedef -pthread")
set(EM_LINK_FLAGS "-s BINARYEN=1 -s \"BINARYEN_METHOD='native-wasm'\" -s DEMANGLE_SUPPORT=1 -s FORCE_FILESYSTEM=1 -s NO_EXIT_RUNTIME=0 --preload-file test.jpg")

# Set compile flags for emscripten clang
if(UNIX)
  set(CMAKE_CXX_FLAGS
    "$ENV{CXXFLAGS} -O2 ${COMMON_CXX_FLAGS}")
  set(CMAKE_CXX_FLAGS_RELEASE
    "$ENV{CXXFLAGS} -O3 -fomit-frame-pointer ${COMMON_CXX_FLAGS}")
  set(CMAKE_CXX_FLAGS_DEBUG
    "$ENV{CXXFLAGS} -Og -fno-omit-frame-pointer -g -ggdb ${COMMON_CXX_FLAGS}")
endif()

include_directories(
  "${JPEG_INCLUDE_DIR}"
  "${BOOST_INCLUDE_DIR}"
  "${CMAKE_CURRENT_BINARY_DIR}"
  "${CMAKE_CURRENT_SOURCE_DIR}")

#
# Emit Emscripten WebIDL glue code
#
add_custom_command(
  OUTPUT imageprocessor-idl-post.js
  COMMAND python ${EMSCRIPTEN_ROOT_PATH}/tools/webidl_binder.py imageprocessor.idl imageprocessor-idl-post
  COMMAND cp ${CMAKE_CURRENT_SOURCE_DIR}/../../resources/test.jpg ${CMAKE_CURRENT_BINARY_DIR}/test.jpg
  WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
  VERBATIM
  USES_TERMINAL
  )
add_custom_target(imageprocessor-idl ALL DEPENDS imageprocessor-idl-post.js)

#
# Emit llvm bitcode for module and produce javascript and wasm
#
add_executable(imageprocessor imageprocessor.cpp imageprocessor-wrapper.cpp)
add_dependencies(imageprocessor imageprocessor-idl)

set_target_properties(imageprocessor PROPERTIES LINK_FLAGS ${EM_LINK_FLAGS})
target_link_libraries(imageprocessor ${JPEG_LIBRARY}/libjpeg.dylib)

em_link_post_js(imageprocessor ${postJsFiles})
