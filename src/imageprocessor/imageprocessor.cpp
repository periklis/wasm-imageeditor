#include <algorithm>
#include <iostream>
#include <stdio.h>
#include <string>
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

void mayflower::wasm::ImageProcessor::dims()
{
  rgb8_image_t img;
  FILE* file = fopen("/data/test.jpg", "rb");
  detail::jpeg_reader m(file);
  m.read_image(img);
  auto p = m.get_dimensions();

  std::cout << "Dimensions: " << p.x << "x" << p.y << std::endl;

  fclose(file);
}

void mayflower::wasm::ImageProcessor::histogram()
{
  rgb8_image_t img;
  jpeg_read_image("/data/test.jpg",img);
  int histogram[256];
  std::fill(histogram,histogram+256,0);
  get_hist(const_view(img),histogram);

  for(std::size_t ii=0;ii<256;++ii)
    std::cout << histogram[ii] << std::endl;
}
