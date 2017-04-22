import { connect } from 'react-redux';
import Console from 'Components/Console/Console';

const mapStateToProps = (state) => ({
  entries: state.log.entries
});

export default connect(
  mapStateToProps
)(Console);
