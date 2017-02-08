cmake_minimum_required (VERSION 3.2 FATAL_ERROR)
project (ImageProcessorModule)

#
# Set this because we cross-compile with emscripten and we need to make sure
# that we find our emscripten built boost as static library
#
set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE BOTH)

find_package(Boost 1.63.0 REQUIRED)
find_package(JPEG REQUIRED)

#
# Module
#
add_executable(imageprocessor src/imageprocessor.cpp)

set_target_properties(imageprocessor PROPERTIES
  ENABLE_EXPORTS TRUE
  CXX_STANDARD 14
  LINK_FLAGS ${EM_LINK_FLAGS})

# target_compile_options(imageprocessor
#   PUBLIC -Wall -Werror -Wno-c++11-narrowing
#   PUBLIC -Wno-unused-local-typedef -pthread)

target_include_directories(imageprocessor
  PUBLIC ${JPEG_INCLUDE_DIR} ${JPEG_CONFIG_DIR}
  PUBLIC ${Boost_INCLUDE_DIR}
  PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/src)

target_link_libraries(imageprocessor PUBLIC ${JPEG_LIBRARY}/libjpeg.dylib)

#
# Tests
#
add_executable(imageprocessor-test test/imageprocessor-test.cpp)

# target_compile_options(imageprocessor-test
#   PUBLIC -Wall -Werror -Wno-c++11-narrowing
#   PUBLIC -Wno-unused-local-typedef -pthread)

set_target_properties(imageprocessor-test PROPERTIES
  CXX_STANDARD 14
  LINK_FLAGS ${EM_LINK_FLAGS})

target_include_directories(imageprocessor-test
  PRIVATE ${CMAKE_CURRENT_SOURCE_DIR}/src)

target_link_libraries(imageprocessor-test imageprocessor gtest_main)
