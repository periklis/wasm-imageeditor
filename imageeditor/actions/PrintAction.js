export const PRINT_ADD = 'PRINT_ADD';
export const PRINT_CLEAR = 'PRINT_CLEAR';

export function printClear() {
  return {type: PRINT_CLEAR};
}

export function printAdd (value) {
  return {type: PRINT_ADD, value};
}
