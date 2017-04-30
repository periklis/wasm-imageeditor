import { connect } from "react-redux";
import { stdioToLog as log } from "../actions";
import ImageProcessor from "../components/ImageProcessor/ImageProcessor";

const mapDispatchToProps = <T>(dispatch: Redux.Dispatch<T>): any => ({
  print: (value: string) => {
    dispatch(log({
      stream: StreamType.STDOUT,
      text: value,
    }));
  },
  printErr: (value: string) => {
    dispatch(log({
      stream: StreamType.STDERR,
      text: value,
    }));
  },
});

export default connect<any, any, any>(
  null,
  mapDispatchToProps,
)(ImageProcessor);
