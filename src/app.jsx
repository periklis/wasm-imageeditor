import styles from './app.scss';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { uploadFile } from './app';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      dimensions: {
        x: 0,
        y: 0
      },
      histogram: []
    };
  }

  onDrop(acceptedFiles) {
    uploadFile(acceptedFiles[0]).then(
      (res => {
        this.setState({
          files: acceptedFiles,
          dimensions: res.dimensions,
          histogram: res.histogram,
          src: res.objectUrl
        });
      })
    );
  }

  render() {
    return (
      <div className={styles.appContainer}>
        <h1>WebAssembly ImageEditor</h1>
        <div className={styles.appToolbox}>
          <Dropzone className={styles.appDropzone}
                    multiple={false}
                    onDrop={this.onDrop.bind(this)}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          <div className={styles.appImageDimensions}>
            <p>Dimensions: {this.state.dimensions.x} x {this.state.dimensions.y}</p>
          </div>
          <div className={styles.appImageHistogram}>
            <p>Histogram: N/A</p>
          </div>
        </div>
        <div className={styles.appImagePreview}>
          <p>Original Image:</p>
          {this.state.files.length > 0 &&
           <div>
             <img src={this.state.files[0].preview} />
             <p> Cropped image:</p>
             <img src={this.state.src} />
           </div>
          }
        </div>
      </div>
    );
  }
}
