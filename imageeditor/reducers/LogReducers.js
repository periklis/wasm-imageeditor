import {CLEAR_LOG, STDIO_TO_LOG} from 'Actions';

export default (state = [], action) => {
  switch(action.type) {
  case CLEAR_LOG:
    return [];
  case STDIO_TO_LOG:
    return [
        ...state,
        action.value
    ];
  default:
    return state;
  }
};
