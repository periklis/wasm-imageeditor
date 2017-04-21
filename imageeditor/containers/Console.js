import { connect } from 'react-redux';
import Console from 'Components/Console/Console';

const mapStateToProps = (state) => ({
  entries: state.printStd.entries
});

export default connect(
  mapStateToProps
)(Console);
