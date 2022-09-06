import * as fs from 'fs';
import * as path from 'path';
import baseOptions from '../lib/yargs';
import print from '../helpers/print.helper';
import database from '../helpers/database.helper';

const codeGenerator = (rcInfo, env) => {};

const loadRcFile = () => {
  const rcFile = path.resolve(process.cwd(), '.sequelizerc');
  return fs.existsSync(rcFile)
    ? JSON.parse(JSON.stringify(require(rcFile)))
    : undefined;
};

export default (yargs) => {
  const args = baseOptions(yargs).argv;
  print(`当前运行环境[${args['env']}]`);
  const rcInfo = loadRcFile();
  if (!rcInfo) {
    print('未找到 .sequelizerc 配置文件', 'error');
    return;
  }
  const sequelize = database(rcInfo, args['env']);
};
