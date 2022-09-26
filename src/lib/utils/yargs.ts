export default (yargs) => {
  return yargs.option('env', {
    describe: '当前运行环境',
    default: 'development',
    type: 'string',
  });
};
