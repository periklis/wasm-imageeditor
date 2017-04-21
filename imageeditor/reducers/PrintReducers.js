import {PRINT_CLEAR, PRINT_COUT} from 'Actions';

export default (state = {entries:[]}, action) => {
  switch(action.type) {
  case PRINT_CLEAR:
    return {
      entries: []
    };
  case PRINT_COUT:
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
