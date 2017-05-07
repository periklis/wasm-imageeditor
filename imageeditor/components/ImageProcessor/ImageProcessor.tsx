import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

export default class ImageProcessor extends Component<IImageProcessorProps, {}> {

  public componentWillMount = () => {
    (window as any).Module = {};
  }

  public componentDidMount() {
    fetch(this.props.wasmFilename)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        Module.arguments = this.props.binArguments;
        Module.environment = this.props.environment;
        Module.locateFile = this.props.locateMemFile;
        Module.logReadFiles = this.props.logReadFiles;
        Module.noExitRuntime = this.props.noExitRuntime;
        Module.noInitialRun = this.props.noInitialRun;
        Module.print = this.props.print;
        Module.printErr = this.props.printErr;
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

  public render() {
    return (
      <div id="ImageProcessor" />
    );
  }
}
