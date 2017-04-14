import styles from './app.scss';
import React, { Component } from 'react';
import { uploadFile } from './app.js';
import Toolbox from '../Toolbox/Toolbox.jsx';
import EditCanvas from '../EditCanvas/EditCanvas.jsx';

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
    const toolBoxProps = {
      dimensions: this.state.dimensions,
      histogram: this.state.histogram
    };
    const editCanvasProps = {
      originalSrc: this.state.files.length > 0 ? this.state.files[0].preview : false,
      modifiedSrc: this.state.src
    };

    return (
      <div className={styles.appContainer}>
        <h1>WebAssembly ImageEditor</h1>

        <Toolbox dimensions={toolBoxProps.dimensions}
                 histogram={toolBoxProps.histogram}
                 onDrop={this.onDrop.bind(this)}/>
        <EditCanvas originalSrc={editCanvasProps.originalSrc}
                    modifiedSrc={editCanvasProps.modifiedSrc}/>
      </div>
    );
  }
}
