import { format } from 'date-fns';

export default (msg: string, level: 'info' | 'warn' | 'error' = 'info') => {
  if (level === 'info') {
    console.log(
      `${format(
        new Date(),
        'yyyy-MM-dd HH:mm:ss',
      )} [Info] : \u001b[37m${msg}\u001b[0m`,
    );
  } else if (level === 'warn') {
    console.warn(
      `${format(
        new Date(),
        'yyyy-MM-dd HH:mm:ss',
      )} [Warn] : \u001b[33m${msg}\u001b[0m`,
    );
  } else if (level === 'error') {
    console.error(
      `${format(
        new Date(),
        'yyyy-MM-dd HH:mm:ss',
      )} [Error]: \u001b[31m${msg}\u001b[0m`,
    );
  }
};
