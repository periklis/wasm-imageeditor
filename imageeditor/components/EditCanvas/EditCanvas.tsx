import styles from './editcanvas.scss';
import React, { Component } from 'react';

export default class EditCanvas extends Component<ICanvasProps, {}> {

  public render() {
    return (
      <div className={styles.editCanvas}>
        <img src={this.props.imageSrc} />
      </div>
    );
  }
}
