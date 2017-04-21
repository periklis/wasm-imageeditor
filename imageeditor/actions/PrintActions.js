export const PRINT_COUT = 'PRINT_COUT';
export const PRINT_CLEAR = 'PRINT_CLEAR';

export function clear() {
  return {type: PRINT_CLEAR};
}

export function cout(value) {
  return {type: PRINT_COUT, value};
}
