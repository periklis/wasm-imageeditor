import { connect } from 'react-redux';
import { stdioToLog as log } from '../actions/LogActions';
import ImageProcessor from '../components/ImageProcessor/ImageProcessor';

const mapDispatchToProps = <T>(dispatch: Redux.Dispatch<T>): any => ({
  print: (value: string) => {
    dispatch(log({
      text: value,
      stream: StreamType.STDOUT
    }));
  },
  printErr: (value: string) => {
    dispatch(log({
      text: value,
      stream: StreamType.STDERR
    }));
  }
});

export default connect<any, any, any>(
    null,
    mapDispatchToProps
)(ImageProcessor);
