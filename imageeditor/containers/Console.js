import { connect } from 'react-redux';
import Console from 'Components/Console/Console';

const mapStateToProps = (state) => ({log: state.log});

export default connect(
  mapStateToProps
)(Console);
