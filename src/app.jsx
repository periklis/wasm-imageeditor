import styles from './index.scss';
import React from 'react';
import Dropzone from 'react-dropzone';
import {uploadFile} from './app';

export default class App extends React.Component {
  render() {
    return (
      <div>
            <Dropzone onDrop={uploadFile}>
            <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
      </div>
    )
  }
}
