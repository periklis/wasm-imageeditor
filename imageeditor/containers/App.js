import { connect } from 'react-redux';
import { saveImage, resizeImage, zoomImage} from 'Actions';
import App from 'Components/App/App';

const defaultStorageName = '/data/original.jpg';

const mapStateToProps = (state) => ({
  dimensions: state.editor.dimensions,
  histogram: state.editor.histogram,
  imageSrc: state.editor.imageSrc
});

const mapDispatchToProps = (dispatch) => ({
  onResize: (value) =>
    dispatch(resizeImage(defaultStorageName, value)),
  onSave: (acceptedFiles) =>
    fetch(acceptedFiles[0].preview)
    .then((response) => response.arrayBuffer())
    .then((buffer) => dispatch(saveImage(buffer, defaultStorageName))),
  onZoom: (zoomFactor) =>
    dispatch(zoomImage(defaultStorageName, zoomFactor))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
