import { combineReducers } from 'redux';
import log from 'Reducers/LogReducers';
import editor from 'Reducers/EditorReducers';

export default combineReducers({log, editor});
