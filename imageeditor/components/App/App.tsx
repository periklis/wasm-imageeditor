import styles from './styles.scss';
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
          <Toolbox dimensions={this.props.dimensions}
                   histogram={this.props.histogram}
                   onSave={this.props.onSave}
                   onResize={this.props.onResize}
                   onZoom={this.props.onZoom} />

          {this.props.imageSrc &&
           <div className={styles.appWorkArea}>
             <EditCanvas imageSrc={this.props.imageSrc} />
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
