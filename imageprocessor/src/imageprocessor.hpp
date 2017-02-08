#ifndef IMAGEPROCESSOR_H_
#define IMAGEPROCESSOR_H_

#include <map>
#include <string>
#include <vector>
#include <emscripten/bind.h>

namespace mayflower  {
namespace wasm {
struct Dims {
  long x;
  long y;
};

class ImageProcessor {
 public:
  ImageProcessor(std::string path)
      : path_(path) {};

  std::map<std::string, long> dimensions();
  std::vector<int> histogram();
 private:
  std::string path_;
};
}
}

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

#endif  // IMAGEPROCESSOR_H_
