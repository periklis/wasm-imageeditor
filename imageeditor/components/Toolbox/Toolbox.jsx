import styles from './toolbox.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

export default class Toolbox extends Component {
  static propTypes = {
    dimensions: PropTypes.object,
    histogram: PropTypes.array,
    onDrop: PropTypes.func.isRequired
  };

  static defaultProps = {
    dimensions: { x: 0, y: 0 },
    histogram: [],
    onDrop: () => {}
  };

  render() {
    return (
      <div className={styles.toolbox}>
        <Dropzone className={styles.dropzone}
                  multiple={false}
                  onDrop={this.props.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <div className={styles.imageDimensions}>
          <p>Dimensions: {this.props.dimensions.x} x {this.props.dimensions.y}</p>
        </div>
        <div className={styles.imageHistogram}>
          <p>Histogram: {this.props.histogram.toString().substring(1,5) + "..."}</p>
        </div>
      </div>
    );
  }
}
