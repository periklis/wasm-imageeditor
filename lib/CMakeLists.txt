cmake_minimum_required (VERSION 3.2 FATAL_ERROR)
project (LibDependencies LANGUAGES CXX)

foreach(libdep googletest libjpeg boost)
  # Download and unpack googletest at configure time
  configure_file(${libdep}/CMakeLists.txt.in ${libdep}/CMakeLists.txt)

  if(${libdep} STREQUAL "boost")
    configure_file(${libdep}/user-config.jam.in ${CMAKE_CURRENT_BINARY_DIR}/${libdep}/src/tools/build/src/user-config.jam)
  endif(${libdep} STREQUAL "boost")

  message(${CMAKE_BINARY_DIR})
  execute_process(COMMAND ${CMAKE_COMMAND} -G "${CMAKE_GENERATOR}" .
    RESULT_VARIABLE result
    WORKING_DIRECTORY ${CMAKE_BINARY_DIR}/lib/${libdep})
  if(result)
    message(FATAL_ERROR "CMake step for ${libdep} failed: ${result}")
  endif()
  execute_process(COMMAND ${CMAKE_COMMAND} --build .
    RESULT_VARIABLE result
    WORKING_DIRECTORY ${CMAKE_BINARY_DIR}/lib/${libdep})
  if(result)
    message(FATAL_ERROR "Build step for ${libdep} failed: ${result}")
  endif()
endforeach(libdep)

# Prevent overriding the parent project's compiler/linker
# settings on Windows
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)

# Add googletest directly to our build. This defines
# the gtest and gtest_main targets.
add_subdirectory(
  ${CMAKE_CURRENT_BINARY_DIR}/googletest/src
  ${CMAKE_CURRENT_BINARY_DIR}/googletest/build)

#
# Add external project dependency for FindBoost module
#
set(Boost_NO_SYSTEM_PATHS ON PARENT_SCOPE)
set(Boost_ADDITIONAL_VERSIONS 1.63.0 PARENT_SCOPE)
set(Boost_USE_MULTITHREADED OFF PARENT_SCOPE)
set(Boost_USE_STATIC_LIBS ON PARENT_SCOPE)
set(BOOST_ROOT "${CMAKE_CURRENT_BINARY_DIR}/boost/build" PARENT_SCOPE)


#
# Add external project dependency for FindJPEG module
#
set(JPEG_INCLUDE_DIR ${CMAKE_CURRENT_BINARY_DIR}/libjpeg/src PARENT_SCOPE)
set(JPEG_CONFIG_DIR ${CMAKE_CURRENT_BINARY_DIR}/libjpeg/build PARENT_SCOPE)
set(JPEG_LIBRARY ${CMAKE_CURRENT_BINARY_DIR}/libjpeg/build/.libs PARENT_SCOPE)
