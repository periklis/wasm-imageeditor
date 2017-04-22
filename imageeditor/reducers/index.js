import { combineReducers } from 'redux';
import print from 'Reducers/PrintReducers';
import editor from 'Reducers/EditorReducers';

export default combineReducers({
  print,
  editor
});
