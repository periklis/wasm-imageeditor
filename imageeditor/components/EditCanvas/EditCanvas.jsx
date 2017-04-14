import styles from './editcanvas.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditCanvas extends Component {
  static propTypes = {
    modifiedSrc: PropTypes.string,
    originalSrc: PropTypes.string
  };

  static defaultProps = {
    modifiedSrc: '',
    originalSrc: ''
  };

  render() {
    return (
      <div className={styles.appImagePreview}>
        <p>Original Image:</p>
        {this.props.originalSrc &&
         <div>
           <img src={this.props.originalSrc} />
           <p> Cropped image:</p>
           <img src={this.props.modifiedSrc} />
         </div>
        }
      </div>
    );
  }
}
