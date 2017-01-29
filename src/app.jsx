import styles from './index.scss';
import React from 'react';
import Dropzone from 'react-dropzone';
import {uploadFile} from './app';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            dimensions:{
                x: 0,
                y: 0
            },
            histogram: []
        };
    }

    onDrop(acceptedFiles) {
        uploadFile(acceptedFiles[0]).then(res => {
            this.setState({
                files: acceptedFiles,
                dimensions: res.dimensions,
                histogram: res.histogram
            });
        });
    }

    render() {
        return (
            <div>
                <Dropzone multiple={false} onDrop={this.onDrop.bind(this)}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
              <div className="ImagePreview">
                {this.state.files.length > 0 &&
                 <div>
                 <img src={this.state.files[0].preview} />
                 <div>Dimensions: {this.state.dimensions.x} x {this.state.dimensions.y}</div>
                 <div>Histogram: {this.state.histogram.toString()} </div>
                 </div>
                }
              </div>
            </div>
        )
    }
}

export default App;
