import {LOG_CLEAR, LOG_COUT} from 'Actions';

export default (state = {entries:[]}, action) => {
  switch(action.type) {
  case LOG_CLEAR:
    return {
      entries: []
    };
  case LOG_COUT:
    return {
      entries: [
        ...state.entries,
        action.value
      ]
    };
  default:
    return state;
  }
};
