import styles from './app.scss';
import React, { Component } from 'react';
import {AppBar} from 'react-toolbox/lib/app_bar';
import Console from '../../containers/Console';
import ImageProcessor from '../../containers/ImageProcessor';
import Toolbox from '../../components/Toolbox/Toolbox';
import EditCanvas from '../../components/EditCanvas/EditCanvas';
import WasmImageProcessor from '../../libs/wasm';

export default class App extends Component<IAppProps, {}> {

  public render() {
    return (
      <div className={styles.appContainer}>
        <AppBar title="WebAssembly ImageEditor" />

        <div className={styles.appContent}>
          <Toolbox dimensions={this.props.toolbox.dimensions}
                   histogram={this.props.toolbox.histogram}
                   onSave={this.props.toolbox.onSave}
                   onResize={this.props.toolbox.onResize}
                   onZoom={this.props.toolbox.onZoom} />

          {this.props.canvas.imageSrc &&
           <div className={styles.appWorkArea}>
             <EditCanvas imageSrc={this.props.canvas.imageSrc} />
             <Console />
           </div>
          }

          <ImageProcessor
              shellFilename='imageprocessor.js'
              wasmFilename='imageprocessor.wasm'
              preInit={[WasmImageProcessor.prepare]}/>
        </div>
      </div>
    );
  }
}
