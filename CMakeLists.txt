cmake_minimum_required (VERSION 3.2 FATAL_ERROR)
project (WasmImageEditor VERSION 0.1.0 LANGUAGES CXX)

# Set compile flags for emscripten clang
set(CMAKE_CXX_FLAGS "-O2")
set(CMAKE_CXX_FLAGS_DEBUG "-g4")
set(CMAKE_CXX_FLAGS_RELEASE "-O2 --llvm-opts 3 --closure 1 -DNDEBUG")
set(CMAKE_CXX_FLAGS_RELWITHDEBINFO "-O2 -g4")
set(CMAKE_CXX_FLAGS_MINSIZEREL "-Os --closure 1")

enable_testing()
add_subdirectory("${PROJECT_SOURCE_DIR}/lib")
add_subdirectory("${PROJECT_SOURCE_DIR}/imageprocessor")
