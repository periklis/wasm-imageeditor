#include <emscripten/bind.h>
#include "imageprocessor.hpp"

EMSCRIPTEN_BINDINGS(ImageProcessor){
  emscripten::register_vector<int>("VectorInt");
  emscripten::register_map<std::string, long>("MapStringLong");

  emscripten::value_object<mayflower::wasm::Dims>("Dimensions")
      .field("x", &mayflower::wasm::Dims::x)
      .field("y", &mayflower::wasm::Dims::y);

  emscripten::class_<mayflower::wasm::ImageProcessor>("ImageProcessor")
      .constructor<std::string>()
      .function("dimensions", &mayflower::wasm::ImageProcessor::dimensions)
      .function("histogram", &mayflower::wasm::ImageProcessor::histogram);
}
