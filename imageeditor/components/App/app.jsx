import styles from './app.scss';
import React, { Component } from 'react';
import ImageProcessor from '../../libs/wasm.js';
import Toolbox from '../Toolbox/Toolbox.jsx';
import EditCanvas from '../EditCanvas/EditCanvas.jsx';

export default class App extends Component {

  state = {
    toolbox: {},
    editCanvas: {}
  }

  uploadFile = (file) => fetch(file.preview)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      var view = new Uint8Array(buffer);

      FS.writeFile(
        '/data/test.jpg',
        view,
        {encoding: 'binary'}
      );
      FS.syncfs(true, (err) => {if(err) console.log(err)});

      return ImageProcessor.process("/data/test.jpg");
    });

  onDrop = (acceptedFiles) => {
    this.uploadFile(acceptedFiles[0]).then(
      (res) => {
        this.setState({
          toolbox: {
            dimensions: res.dimensions,
            histogram: res.histogram
          },
          editCanvas: {
            originalSrc: acceptedFiles[0].preview,
            modifiedSrc: res.objectUrl
          }
        });
      }
    );
  }

  render() {
    const {toolbox, editCanvas} = this.state;

    return (
      <div className={styles.appContainer}>
        <h1>WebAssembly ImageEditor</h1>

        <Toolbox dimensions={toolbox.dimensions}
                 histogram={toolbox.histogram}
                 onDrop={this.onDrop}/>

        <EditCanvas originalSrc={editCanvas.originalSrc}
                    modifiedSrc={editCanvas.modifiedSrc}/>
      </div>
    );
  }
}
