import { connect } from 'react-redux';
import { stdioToLog as log } from 'Actions';
import ImageProcessor from 'Components/ImageProcessor/ImageProcessor';

const mapDispatchToProps = (dispatch) => ({
  onPrint: (value) => {
    dispatch(log({
      id: Math.floor(Math.random(1, 10000) * 10000),
      text: value,
      stream: 'STDOUT'
    }));
  },
  onPrintErr: (value) => {
    dispatch(log({
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
