import styles from './toolbox.scss';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

export default class Toolbox extends Component {

  render() {
    return (
      <div className={styles.appToolbox}>
        <Dropzone className={styles.appDropzone}
                  multiple={false}
                  onDrop={this.props.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <div className={styles.appImageDimensions}>
          <p>Dimensions: {this.props.dimensions.x} x {this.props.dimensions.y}</p>
        </div>
        <div className={styles.appImageHistogram}>
          <p>Histogram: {this.props.histogram}</p>
        </div>
      </div>
    );
  }
}
