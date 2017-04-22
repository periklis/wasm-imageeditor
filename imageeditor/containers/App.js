import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { saveImage, resizeImage, zoomImage} from 'Actions';
import App from 'Components/App/App';
import WasmImageProcessor from 'Libs/wasm.js';

const initialStoragePath = '/data/original.jpg';

const mapStateToProps = (state) => (state.image);

const mapDispatchToProps = (dispatch) => ({
  onResize: (value) => {
    const image = WasmImageProcessor.resize(initialStoragePath, value.width, value.height);
    dispatch(resizeImage(image));
  },
  onSave: (acceptedFiles) => {
    fetch(acceptedFiles[0].preview)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const image = WasmImageProcessor.save(buffer, initialStoragePath);
        dispatch(saveImage(image));
      });
  },
  onZoom: (zoomFactor) => {
    const image = WasmImageProcessor.zoom(initialStoragePath, zoomFactor);
    dispatch(zoomImage(image));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
