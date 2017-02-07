cmake_minimum_required (VERSION 2.8)
project (ImageProcessorModule)

file(GLOB postJsFiles *post.js)

include_directories(
  "${JPEG_INCLUDE_DIR}"
  "${LIBCXX_INCLUDE_DIR}"
  "${BOOST_INCLUDE_DIR}"
  "${CMAKE_CURRENT_BINARY_DIR}"
  "${CMAKE_CURRENT_SOURCE_DIR}")

#
# Emit llvm bitcode for module and produce javascript and wasm
#
add_executable(imageprocessor imageprocessor.cpp)
set_target_properties(imageprocessor PROPERTIES LINK_FLAGS ${EM_LINK_FLAGS})
target_link_libraries(imageprocessor ${JPEG_LIBRARY}/libjpeg.dylib)

# em_link_post_js(imageprocessor ${postJsFiles})
