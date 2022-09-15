import * as fs from 'fs';
import * as path from 'path';
import * as Bb from 'bluebird';
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

export default async (yargs) => {
  const args = baseOptions(yargs).argv;
  print(`当前运行环境[${args['env']}]`);
  const rcInfo = loadRcFile();
  if (!rcInfo) {
    print('未找到 .sequelizerc 配置文件', 'error');
    return;
  }
  const db = new database(rcInfo, args['env']);
  await db.connect();
  const tables = await db.getTables();
  console.log(tables);
  await Bb.each(tables, async (table) => {
    const columns = await db.getColumns(table.tableName);
    console.log(columns);
  });
  await db.disconnect();
};
