#ifndef IMAGEPROCESSOR_H_
#define IMAGEPROCESSOR_H_

#include <map>
#include <string>
#include <vector>

namespace mayflower  {
namespace wasm {

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

#endif  // IMAGEPROCESSOR_H_
