import styles from './app.scss';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import ImageProcessor from 'Components/ImageProcessor/ImageProcessor.jsx';
import Toolbox from 'Components/Toolbox/Toolbox.jsx';
import EditCanvas from 'Components/EditCanvas/EditCanvas.jsx';
import WasmImageProcessor from 'Libs/wasm.js';

export default class App extends Component {
  static propTypes = {
    originalFilename: PropTypes.string.isRequired
  }

  static defaultProps = {
    originalFilename: '/data/original.jpg'
  }

  state = {
    toolbox: {},
    editCanvas: {},
  }

  onDrop = (acceptedFiles) => fetch(acceptedFiles[0].preview)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const results = WasmImageProcessor.save(
        buffer,
        this.props.originalFilename
      );

      this.updateState(results);
    });

  onResize = (value) => {
    const res = WasmImageProcessor.resize(
      this.props.originalFilename,
      value.width,
      value.height
    );
    this.updateState(res);
  }

  onZoom = (value) => {
    const res = WasmImageProcessor.zoom(
      this.props.originalFilename,
      value
    );
    this.updateState(res);
  }

  updateState = (newState) => {
    this.setState({
      toolbox: {
        dimensions: newState.dimensions,
        histogram: newState.histogram
      },
      editCanvas: {
        imageSrc: newState.objectUrl
      }
    });
  }

  render() {
    const {toolbox, editCanvas} = this.state;

    return (
      <div className={styles.appContainer}>
        <AppBar title="WebAssembly ImageEditor"
                className={styles.appBar} />

        <ImageProcessor
            shellFilename='imageprocessor.js'
            wasmFilename='imageprocessor.wasm'
            postRun={[WasmImageProcessor.prepare]}/>

        <Toolbox dimensions={toolbox.dimensions}
                 histogram={toolbox.histogram}
                 onDrop={this.onDrop}
                 onResize={this.onResize}
                 onZoom={this.onZoom} />

        <EditCanvas imageSrc={editCanvas.imageSrc} />
      </div>
    );
  }
}
