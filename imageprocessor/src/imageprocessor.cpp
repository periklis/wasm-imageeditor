#include <boost/gil/image.hpp>
#include <boost/gil/typedefs.hpp>
#include <boost/gil/color_convert.hpp>
#include <boost/gil/extension/io/jpeg_io.hpp>
#include <boost/gil/extension/io/jpeg_io_private.hpp>
#include "imageprocessor.hpp"

namespace mayflower {
namespace wasm {
std::map<std::string, long> ImageProcessor::dimensions()
{
  boost::gil::rgb8_image_t srcImg;
  jpeg_read_image(path_, srcImg);
  auto p = srcImg.dimensions();

  std::map<std::string, long> dims;
  dims.emplace(std::make_pair("x", p.x));
  dims.emplace(std::make_pair("y", p.y));

  return dims;
}

std::vector<int> ImageProcessor::histogram()
{
  boost::gil::rgb8_image_t srcImg;
  jpeg_read_image(path_, srcImg);

  std::vector<int> vec(256, 0);

  auto cv = boost::gil::const_view(srcImg);
  auto srcImg_view = boost::gil::color_converted_view<boost::gil::gray8_pixel_t>(cv);
  for (auto it=srcImg_view.begin(); it!=srcImg_view.end(); ++it)
    ++vec[*it];

  return vec;
}

// Re-enable when boost::gil numeric extension are available
// void ImageProcessor::resize(int w, int h)
// {
//   boost::gil::rgb8_image_t srcImg;
//   jpeg_read_image(path_, srcImg);

//   srcImg.recreate(w, h);

//   jpeg_write_view(path_, boost::gil::const_view(srcImg));
// }

void ImageProcessor::crop(int start_x, int start_y, int end_x, int end_y)
{
  boost::gil::rgb8_image_t srcImg;
  jpeg_read_image(path_, srcImg);

  auto srcView = boost::gil::view(srcImg);
  auto subView = boost::gil::subimage_view(srcView, start_x, start_y, end_x, end_y);

  jpeg_write_view(path_, subView);
}

} // namespace wasm
} // namespace mayflower
