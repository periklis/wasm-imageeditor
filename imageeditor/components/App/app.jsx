import styles from './app.scss';
import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import {Layout, Panel} from 'react-toolbox/lib/layout';
import ImageProcessor from 'Components/ImageProcessor/ImageProcessor.jsx';
import Toolbox from 'Components/Toolbox/Toolbox.jsx';
import EditCanvas from 'Components/EditCanvas/EditCanvas.jsx';

export default class App extends Component {

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
    this.setState({
      toolbox: {
        dimensions: res.dimensions,
        histogram: res.histogram
      },
      editCanvas: {
        imageSrc: res.objectUrl
      },
      imageProcessor: {
        buffer: null
      }
    });
  }

  render() {
    const {toolbox, editCanvas, imageProcessor} = this.state;

    return (
      <Layout>
        <Panel className={styles.appContainer}>
          <AppBar title="WebAssembly ImageEditor"
                  className={styles.appBar} />

          <ImageProcessor onUpload={this.onUpload}
                          buffer={imageProcessor.buffer}
                          filename="/data/test.jpg" />

          <Toolbox dimensions={toolbox.dimensions}
                   histogram={toolbox.histogram}
                   onDrop={this.onDrop} />

          <EditCanvas imageSrc={editCanvas.imageSrc} />
        </Panel>
      </Layout>
    );
  }
}
