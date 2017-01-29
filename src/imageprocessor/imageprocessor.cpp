#include <boost/gil/image.hpp>
#include <boost/gil/typedefs.hpp>
#include <boost/gil/color_convert.hpp>
#include <boost/gil/extension/io/jpeg_io.hpp>
#include <boost/gil/extension/io/jpeg_io_private.hpp>

#include "imageprocessor.hpp"

using namespace boost::gil;

template <typename GrayView, typename R>
void gray_image_hist(const GrayView& img_view, R& hist) {
  for (typename GrayView::iterator it=img_view.begin(); it!=img_view.end(); ++it)
    ++hist[*it];
}

template <typename V, typename R>
void get_hist(const V& img_view, R& hist) {
  gray_image_hist(color_converted_view<gray8_pixel_t>(img_view), hist);
}

using namespace mayflower::wasm;

std::map<std::string, long> ImageProcessor::dimensions()
{
  rgb8_image_t img;
  jpeg_read_image(path_, img);
  auto p = img.dimensions();

  std::map<std::string, long> dims;
  dims.emplace(std::make_pair("x", p.x));
  dims.emplace(std::make_pair("y", p.y));

  return dims;
}

std::vector<int> ImageProcessor::histogram()
{
  rgb8_image_t img;
  jpeg_read_image(path_, img);

  std::vector<int> vec (256, 0);

  get_hist(const_view(img), vec);

  return vec;
}
