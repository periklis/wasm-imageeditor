import { connect } from 'react-redux';
import { cout } from 'Actions';
import ImageProcessor from 'Components/ImageProcessor/ImageProcessor';

const mapDispatchToProps = (dispatch) => ({
  onPrint: (value) => {
    dispatch(cout({
      id: Math.floor(Math.random(1, 10000) * 10000),
      text: value,
      stream: 'STDOUT'
    }));
  },
  onPrintErr: (value) => {
    dispatch(cout({
      id: Math.floor(Math.random(1, 10000) * 10000),
      text: value,
      stream: 'STDERR'
    }));
  }
});

export default connect(
  () => ({}),
  mapDispatchToProps
)(ImageProcessor);
