import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ImageProcessor extends Component {
  static propTypes = {
    binArguments: PropTypes.string,
    environment: PropTypes.string.isRequired,
    locateMemFile: PropTypes.func,
    logReadFiles: PropTypes.bool,
    noExitRuntime: PropTypes.bool,
    noInitialRun: PropTypes.bool,
    onPrint: PropTypes.func,
    onPrintErr: PropTypes.func,
    postRun: PropTypes.array,
    preInit: PropTypes.array,
    preRun: PropTypes.array,
    shellFilename: PropTypes.string.isRequired,
    wasmFilename: PropTypes.string.isRequired
  }

  static defaultProps = {
    binArguments: '',
    environment: 'WEB',
    locateMemFile: undefined,
    logReadFiles: false,
    noExitRuntime: false,
    noInitialRun: false,
    onPrint: () => {},
    onPrintErr: () => {},
    postRun: [],
    preInit: [],
    preRun: [],
    shellFilename: '',
    wasmFilename: ''
  }

  componentWillMount = () => {
    window.Module = {};
  }

  componentDidMount() {
    fetch(this.props.wasmFilename)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        Module.arguments = this.props.binArguments;
        Module.environment = this.props.environment;
        Module.locateFile = this.props.locateMemFile;
        Module.logReadFiles = this.props.logReadFiles;
        Module.noExitRuntime = this.props.noExitRuntime;
        Module.noInitialRun = this.props.noInitialRun;
        Module.print = this.props.onPrint;
        Module.printErr = this.props.onPrintErr;
        Module.preInit = this.props.preInit;
        Module.preRun = this.props.preRun;
        Module.postRun = this.props.postRun;
        Module.wasmBinary = buffer;

        fetch(this.props.shellFilename)
          .then((response) => response.blob())
          .then((responseBlob) => {
            const script = document.createElement('script');
            const src = URL.createObjectURL(responseBlob);

            script.src = src;
            script.async = false;
            document.getElementById('ImageProcessor').appendChild(script);
          });
      });
  }

  render() {
    return (
      <div id="ImageProcessor" />
    );
  }
}
