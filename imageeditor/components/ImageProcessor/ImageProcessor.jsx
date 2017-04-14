import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WasmImageProcessor from '../../libs/wasm.js';

export default class ImageProcessor extends Component {
  static propTypes = {
    buffer: PropTypes.object,
    filename: PropTypes.string.isRequired,
    onUpload: PropTypes.func.isRequired
  }

  static defaultProps = {
    buffer: null,
    filename: '',
    onUpload: () => {}
  }

  componentDidMount() {
    fetch('imageprocessor.wasm')
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        Module.wasmBinary = buffer;
        Module.postRun = [WasmImageProcessor.prepare];

        fetch('imageprocessor.js')
          .then((response) => response.blob())
          .then((responseBlob) => {
            const script = document.createElement('script');
            const src = URL.createObjectURL(responseBlob);

            script.src = src;
            script.async = false;
            document.getElementById('ImageProcessor').appendChild(script);
          });
      });
  }

  componentDidUpdate() {
    if (this.props.buffer != null){
      const results = WasmImageProcessor.process(
        this.props.buffer,
        this.props.filename
      );
      this.props.onUpload(results);
    }
  }

  render() {
    return (
      <div id="ImageProcessor">
      </div>
    );
  }
}
