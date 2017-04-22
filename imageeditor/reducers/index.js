import { combineReducers } from 'redux';
import log from 'Reducers/LogReducers';
import image from 'Reducers/ImageReducers';

export default combineReducers({log, image});
