import {PRINT_CLEAR, PRINT_ADD} from 'Actions/PrintAction';

export default (state = {entries:[]}, action) => {
  switch(action.type) {
  case PRINT_CLEAR:
    return {
      entries: []
    };
  case PRINT_ADD:
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
