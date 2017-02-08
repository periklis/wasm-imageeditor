#include "gtest/gtest.h"
#include "imageprocessor.hpp"

using namespace mayflower::wasm;

class ImageProcessorFixture : public ::testing::Test {
 public:
  ImageProcessorFixture() {

  }

  virtual ~ImageProcessorFixture(){}

  ImageProcessor im {"/data/test.JPEG"};

};

TEST_F(ImageProcessorFixture, ImageProcessorTestDimensions) {
  auto dims = im.dimensions();

  EXPECT_EQ(440, dims.find("x")->second);
  EXPECT_EQ(72, dims.find("y")->second);
}
