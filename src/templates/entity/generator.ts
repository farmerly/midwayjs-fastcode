import BaseGenerator from '../generator';
import print from '../../lib/utils/print';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import defaultColumn from '../../lib/constant/default-column';

const sequelizeColGenerate = (info: {
  columns: any[];
  foreignKeys: any[];
  references: any[];
}) => {};

const staticFieldsGenerate = (info: {
  columns: any[];
  foreignKeys: any[];
  references: any[];
}) => {};

export default class EntityGenerator extends BaseGenerator {
  async generate(
    table: { tableName: string; tableComment: string },
    info: { columns: any[]; foreignKeys: any[]; references: any[] },
    modulePath: string,
  ): Promise<void> {
    print(`${table.tableName} 生成 entity 文件`);

    /** 获取 module 目录的绝对路径 */
    const perfectPath = path.join(process.cwd(), modulePath);
    if (!this.fileAccess(perfectPath)) this.mkdir(perfectPath);

    /** 拼装模板所需要的数据 */
    const data = {};
    _.set(data, 'className', this.pascalConvert(table.tableName));
    _.set(data, 'classNameUpper', this.upperConvert(table.tableName));
    _.set(data, 'tableName', this.pascalConvert(table.tableName));
    _.set(data, 'tableComment', table.tableComment);

    const fieldsOfEntity = sequelizeColGenerate(info);
    _.set(data, 'fieldsOfEntity', fieldsOfEntity);
    const templatePath = path.join(__dirname, 'template.ts.ejs');
    const template = fs.readFileSync(templatePath, 'utf8');
    const content = ejs.compile(template)(data);

    /** 写入文件 */
    const fileName = `${this.hyphenConvert(table.tableName)}.ts`;
    this.writeFile(path.join(perfectPath, fileName), content);
  }
}
