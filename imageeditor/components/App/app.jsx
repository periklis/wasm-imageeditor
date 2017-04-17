import styles from './app.scss';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import {Layout, Panel} from 'react-toolbox/lib/layout';
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
    imageProcessor: {}
  }

  onDrop = (acceptedFiles) => fetch(acceptedFiles[0].preview)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      this.setState({
        imageProcessor: {
          buffer: buffer
        }
      });
    });

  onUpload = (res) => {
    this.updateState(res);
  }

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
      },
      imageProcessor: {
        buffer: null
      }
    });
  }

  render() {
    const {toolbox, editCanvas, imageProcessor} = this.state;

    return (
      <div className={styles.appContainer}>
        <AppBar title="WebAssembly ImageEditor"
                className={styles.appBar} />

        <ImageProcessor onUpload={this.onUpload}
                        buffer={imageProcessor.buffer}
                        filename={this.props.originalFilename} />

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
