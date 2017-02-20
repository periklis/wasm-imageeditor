#ifndef IMAGEPROCESSOR_H_
#define IMAGEPROCESSOR_H_

#include <map>
#include <string>
#include <vector>

namespace mayflower  {
namespace wasm {

class ImageProcessor {
 public:
  ImageProcessor(const std::string& path)
      : path_(path) {};

  ImageProcessor(const ImageProcessor& ip) = delete;
  ImageProcessor& operator=(const ImageProcessor& ip) = delete;

  std::map<std::string, long> dimensions();

  std::vector<int> histogram();

  // void resize(int w, int h);

  void crop(int start_x, int start_y, int end_x, int end_y);

 private:
  std::string path_;
};
} // namespace wasm
} // namespace mayflower

#endif  // IMAGEPROCESSOR_H_
