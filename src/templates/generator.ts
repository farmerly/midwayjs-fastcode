import fs from 'fs';
import _ from 'lodash';

export default abstract class Generator {
  abstract generate(
    table: { tableName: string; tableComment: string },
    info: { columns: any[]; foreignKeys: any[]; references: any[] },
    modulePath: string,
  ): Promise<void>;

  /**
   * 转换为驼峰命名
   * @param name 字段名
   * @returns
   */
  camelConvert(name: string) {
    return _.camelCase(name);
  }

  /**
   * 转换为帕斯卡命名
   * @param name 字段名
   * @returns
   */
  pascalConvert(name: string) {
    return _.upperFirst(_.camelCase(name));
  }

  /**
   * 下划线转中横线
   * @param name
   */
  hyphenConvert(name: string) {
    return new String(name).replace(/_/g, '-');
  }

  /**
   * 转大写
   * @param name
   * @returns
   */
  upperConvert(name: string) {
    return _.toUpper(name);
  }

  /**
   * 文件是否存在
   * @param filepath
   * @returns
   */
  fileAccess(filepath: string) {
    try {
      fs.accessSync(filepath);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return false;
      }
      throw error;
    }
    return true;
  }

  /**
   * 创建文件夹
   * @param filepath
   */
  mkdir(filepath: string) {
    try {
      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath);
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 写入文件
   * @param filename 文件路径
   * @param content 文件内容
   */
  writeFile(filename: string, content: string) {
    fs.writeFileSync(filename, content, { encoding: 'utf8' });
  }
}
