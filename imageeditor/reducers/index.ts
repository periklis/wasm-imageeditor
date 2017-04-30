import { combineReducers } from "redux";
import image from "./ImageReducers";
import log from "./LogReducers";

export default combineReducers({log, image});
