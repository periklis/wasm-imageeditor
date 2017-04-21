export const LOG_COUT = 'LOG_COUT';
export const LOG_CLEAR = 'LOG_CLEAR';

export function clear() {
  return {type: LOG_CLEAR};
}

export function cout(value) {
  return {type: LOG_COUT, value};
}
