import styles from './editcanvas.scss';
import React, { Component } from 'react';

export default class EditCanvas extends Component {

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
