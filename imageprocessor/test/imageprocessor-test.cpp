#include "gtest/gtest.h"
#include "imageprocessor.hpp"

class ImageProcessorFixture : public ::testing::Test {
 public:
  ImageProcessorFixture() {}

  virtual ~ImageProcessorFixture(){}

  mayflower::wasm::ImageProcessor im {"/data/test.jpg"};

};

TEST_F(ImageProcessorFixture, ImageProcessorTestDimensions)
{
  auto dims = im.dimensions();

  EXPECT_EQ(440, dims.find("x")->second);
  EXPECT_EQ(72, dims.find("y")->second);
}


// TEST_F(ImageProcessorFixture, ImageProcessorTestResize)
// {
//   im.resize(500, 500);

//   auto dims = im.dimensions();

//   EXPECT_EQ(500, dims.find("x")->second);
//   EXPECT_EQ(500, dims.find("y")->second);
// }

TEST_F(ImageProcessorFixture, ImageProcessorTestCrop)
{
  im.crop(100, 0, 100, 30);

  auto dims = im.dimensions();

  EXPECT_EQ(100, dims.find("x")->second);
  EXPECT_EQ(30, dims.find("y")->second);
}
