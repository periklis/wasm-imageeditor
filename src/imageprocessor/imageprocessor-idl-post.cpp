
#include <emscripten.h>

extern "C" {

// Not using size_t for array indices as the values used by the javascript code are signed.
void array_bounds_check(const int array_size, const int array_idx) {
  if (array_idx < 0 || array_idx >= array_size) {
    EM_ASM_INT({
      throw 'Array index ' + $0 + ' out of bounds: [0,' + $1 + ')';
    }, array_idx, array_size);
  }
}

// VoidPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VoidPtr___destroy___0(void** self) {
  delete self;
}

// ImageProcessor

mayflower::wasm::ImageProcessor* EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageProcessor_ImageProcessor_0() {
  return new mayflower::wasm::ImageProcessor();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageProcessor_dims_0(mayflower::wasm::ImageProcessor* self) {
  self->dims();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageProcessor_histogram_0(mayflower::wasm::ImageProcessor* self) {
  self->histogram();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_ImageProcessor___destroy___0(mayflower::wasm::ImageProcessor* self) {
  delete self;
}

}

