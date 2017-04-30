import { combineReducers } from 'redux';
import log from './LogReducers';
import image from './ImageReducers';

export default combineReducers({log, image});
