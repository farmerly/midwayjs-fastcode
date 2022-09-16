import fs from 'fs';
import path from 'path';
import Bb from 'bluebird';
import inquirer from 'inquirer';
import baseOptions from '../lib/yargs';
import print from '../helpers/print.helper';
import database from '../helpers/database.helper';
import stringComplement from '../helpers/complement.helper';

const loadRcFile = () => {
  const rcFile = path.resolve(process.cwd(), '.sequelizerc');
  return fs.existsSync(rcFile)
    ? JSON.parse(JSON.stringify(require(rcFile)))
    : undefined;
};

const choiceTables = async (
  tables: { tableName: string; tableComment: string }[],
) => {
  const message = `选择需要生成的表名称:`;
  const choices = await Bb.map(tables, (p) => {
    const name = stringComplement(p.tableName, 'suffix');
    const comment = stringComplement(p.tableComment, 'prefix');
    return { name: `${name} <----> ${comment}`, value: p };
  });

  return inquirer
    .prompt([
      {
        name: 'data',
        type: 'checkbox',
        message: message,
        choices: choices,
      },
    ])
    .then((ret) => ret.data);
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
  const finalTables: any[] = await choiceTables(tables);
  await Bb.each(finalTables, async (table) => {
    const columns = await db.getColumns(table.tableName);
    const foreignKeys = await db.getreferentialConstraints(
      table.tableName,
      'foreignKeys',
    );
    const references = await db.getreferentialConstraints(
      table.tableName,
      'references',
    );
    console.log(columns);
    console.log(foreignKeys);
    console.log(references);
  });
  await db.disconnect();
};
