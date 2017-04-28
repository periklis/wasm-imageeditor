import styles from './app.scss';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Console from 'Containers/Console';
import ImageProcessor from 'Containers/ImageProcessor';
import Toolbox from 'Components/Toolbox/Toolbox.jsx';
import EditCanvas from 'Components/EditCanvas/EditCanvas.jsx';
import WasmImageProcessor from 'Libs/wasm.js';

export default class App extends Component {
  static propTypes = {
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }),
    histogram: PropTypes.array.isRequired,
    imageSrc: PropTypes.string.isRequired,
    onResize: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onZoom: PropTypes.func.isRequired
  }

  static defaultProps = {
    dimensions: {
      width: 0,
      height: 0
    },
    histogram: [],
    imageSrc: '',
    onResize: () => {},
    onSave: () => {},
    onZoom: () => {}
  }

  render() {
    return (
      <div className={styles.appContainer}>
        <AppBar title="WebAssembly ImageEditor"
                className={styles.appBar} />

        <Toolbox dimensions={this.props.dimensions}
                 histogram={this.props.histogram}
                 onDrop={this.props.onSave}
                 onResize={this.props.onResize}
                 onZoom={this.props.onZoom} />

        <div className={styles.appWorkArea}>
          <EditCanvas imageSrc={this.props.imageSrc} />
          <Console />
        </div>

        <ImageProcessor
            shellFilename='imageprocessor.js'
            wasmFilename='imageprocessor.wasm'
            preInit={[WasmImageProcessor.prepare]}/>
      </div>
    );
  }
}
