import BaseGenerator from '../generator';
import print from '../../helpers/print.helper';

export default class ControllerGenerator implements BaseGenerator {
  async generate(
    table: { tableName: string; tableComment: string },
    info: { columns: any[]; foreignKeys: any[]; references: any[] },
    path: string,
  ): Promise<void> {
    print(`生成 controller 文件: ${table.tableName}`);
  }
}
