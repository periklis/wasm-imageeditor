import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { saveImage, resizeImage, zoomImage} from 'Actions';
import App from 'Components/App/App';
import WasmImageProcessor from 'Libs/wasm.js';

const defaultStorageName = '/data/original.jpg';

const mapStateToProps = (state) => ({
  dimensions: state.editor.dimensions,
  histogram: state.editor.histogram,
  imageSrc: state.editor.imageSrc
});

const mapDispatchToProps = (dispatch) => ({
  onResize: (value) => {
    const results = WasmImageProcessor.resize(defaultStorageName, value.width, value.height);
    dispatch(resizeImage(results));
  },
  onSave: (acceptedFiles) => {
    fetch(acceptedFiles[0].preview)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const results = WasmImageProcessor.save(buffer, defaultStorageName);
        dispatch(saveImage(results));
      });
  },
  onZoom: (zoomFactor) => {
    const results = WasmImageProcessor.zoom(defaultStorageName, zoomFactor);
    dispatch(zoomImage(results));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
