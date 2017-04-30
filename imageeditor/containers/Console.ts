import { connect } from 'react-redux';
import Console from '../components/Console/Console';

const mapStateToProps = (state: any): any => ({log: state.log});

export default connect<any, any, any>(
  mapStateToProps
)(Console);
