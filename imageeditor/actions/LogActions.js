export const STDIO_TO_LOG = 'STDIO_TO_LOG';
export const CLEAR_LOG = 'CLEAR_LOG';

export const clearLog = () => ({
  type: CLEAR_LOG
});

export const stdioToLog = (value) => ({
  type: STDIO_TO_LOG,
  value
});
