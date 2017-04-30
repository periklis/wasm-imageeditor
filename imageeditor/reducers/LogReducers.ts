import {CLEAR_LOG, STDIO_TO_LOG} from '../actions';

export default (state: any = [], action: ILogAction) => {
  switch(action.type) {
  case CLEAR_LOG:
    return [];
  case STDIO_TO_LOG:
    return [
        ...state,
        action.log
    ];
  default:
    return state;
  }
};
