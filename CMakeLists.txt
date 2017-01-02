cmake_minimum_required (VERSION 2.8)
project (WasmImageEditor LANGUAGES CXX)

set(JPEG_LIBRARY "${CMAKE_CURRENT_BINARY_DIR}/lib/jpeg-8d/.libs")
set(JPEG_INCLUDE_DIR "${CMAKE_CURRENT_BINARY_DIR}/lib/jpeg-8d")
set(JPEG_DIR "${JPEG_LIBRARY}/.libs")

set(BOOST_INCLUDE_DIR "${CMAKE_CURRENT_BINARY_DIR}/lib/boost_1_63_0")

find_package(JPEG)

add_subdirectory("${PROJECT_SOURCE_DIR}/lib")
add_subdirectory("${PROJECT_SOURCE_DIR}/src/imageprocessor")
