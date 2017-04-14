import styles from './editcanvas.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditCanvas extends Component {
  static propTypes = {
    imageSrc: PropTypes.string
  };

  static defaultProps = {
    imageSrc: ''
  };

  render() {
    return (
      <div className={styles.appImagePreview}>
        {this.props.imageSrc &&
         <img src={this.props.imageSrc} />
        }
      </div>
    );
  }
}
