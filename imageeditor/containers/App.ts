import fetch from "isomorphic-fetch";
import { connect } from "react-redux";
import { resizeImage, saveImage, zoomImage } from "../actions/ImageActions";
import App from "../components/App/App";
import WasmImageProcessor from "../libs/wasm";

const initialStoragePath = "/data/original.jpg";

const mapStateToProps = (state: any): any => (state.image);

const mapDispatchToProps = <T>(dispatch: Redux.Dispatch<T>): any => ({
  onResize: (value: IImageDimensions) => {
    const image = WasmImageProcessor.resize(initialStoragePath, value.width, value.height);
    dispatch(resizeImage(image));
  },
  onSave: (acceptedFiles: any[]) => {
    fetch(acceptedFiles[0].preview)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const image = WasmImageProcessor.save(buffer, initialStoragePath);
        dispatch(saveImage(image));
      });
  },
  onZoom: (zoomFactor: number) => {
    const image = WasmImageProcessor.zoom(initialStoragePath, zoomFactor);
    dispatch(zoomImage(image));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
