import * as fs from 'fs';
import print from '../helpers/print.helper';
import { DataTypes, Sequelize } from 'sequelize';

const getConfig = (rcInfo, env) => {
  return fs.existsSync(rcInfo.config) ? require(rcInfo.config)[env] : undefined;
};

const Tables = {
  tableSchema: { type: DataTypes.STRING(64), comment: '表所属数据库' },
  tableName: { type: DataTypes.STRING(64), comment: '表名称' },
  tableComment: { type: DataTypes.TEXT, comment: '表注释' },
};

const Columns = {
  tableSchema: { type: DataTypes.STRING(64), comment: '表所属数据库' },
  tableName: { type: DataTypes.STRING(64), comment: '表名称' },
  columnName: { type: DataTypes.STRING(64), comment: '字段名称' },
  columnComment: { type: DataTypes.TEXT, comment: '字段注释' },
  dataType: { type: DataTypes.TEXT, comment: '数据类型' },
  characterMaximumLength: { type: DataTypes.BIGINT, comment: '字段长度' },
  isNullable: { type: DataTypes.STRING(3), comment: '是否可为NULL, YES/NO' },
  numericPrecision: { type: DataTypes.BIGINT, comment: '整数部分长度' },
  numericScale: { type: DataTypes.BIGINT, comment: '小数部分长度' },
  columnKey: {
    type: DataTypes.ENUM('', 'PRI', 'UNI', 'MUL'),
    comment: '字段类型',
  },
};

const KeyColumnUsage = {
  constraintSchema: { type: DataTypes.STRING(64), comment: '约束所属数据库' },
  constraintName: { type: DataTypes.STRING(64), comment: '约束名称' },
  tableSchema: { type: DataTypes.STRING(64), comment: '表所属数据库' },
  tableName: { type: DataTypes.STRING(64), comment: '表名称' },
  columnName: { type: DataTypes.STRING(64), comment: '字段名称' },
  referencedTableName: {
    type: DataTypes.STRING(64),
    comment: '：约束引用的表的名称',
  },
  referencedColumnName: {
    type: DataTypes.STRING(64),
    comment: '：约束引用的表的名称',
  },
};

const ReferentialConstraints = {
  constraintSchema: { type: DataTypes.STRING(64), comment: '约束所属数据库' },
  constraintName: { type: DataTypes.STRING(64), comment: '约束名称' },
  updateRule: {
    type: DataTypes.ENUM,
    comment:
      '约束ON UPDATE属性的值(CASCADE, SET NULL, SET DEFAULT, RESTRICT, NO ACTION)',
  },
  deleteRule: {
    type: DataTypes.ENUM,
    comment:
      '约束ON DELETE属性的值(CASCADE, SET NULL, SET DEFAULT, RESTRICT, NO ACTION)',
  },
  tableName: { type: DataTypes.STRING(64), comment: '表名称' },
  referencedTableName: {
    type: DataTypes.STRING(64),
    comment: '：约束引用的表的名称',
  },
};

export default class DBContext {
  private sequelize;
  private database;

  constructor(rcInfo, env) {
    const config = getConfig(rcInfo, env);
    this.database = config.database;
    config.database = 'information_schema';
    config.define = {
      charset: 'utf8',
      underscored: true,
    };
    this.sequelize = new Sequelize(config);
    this.sequelize.define('tables', Tables);
    this.sequelize.define('columns', Columns);
    this.sequelize.define('key_column_usage', KeyColumnUsage);
    this.sequelize.define('referential_constraints', ReferentialConstraints);
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      print('database connection succeeded!');
    } catch (error) {
      throw new Error(`database connect error, ${error.message}`);
    }
  }

  async disconnect() {
    try {
      await this.sequelize.close();
      print('database disconnection succeeded!');
    } catch (error) {
      throw new Error(`database disconnect error, ${error.message}`);
    }
  }

  async getTables(): Promise<{ tableName: string; tableComment: string }[]> {
    return this.sequelize.models.tables
      .findAll({
        where: {
          tableSchema: this.database,
        },
        attributes: ['tableName', 'tableComment'],
      })
      .then((list) => {
        return list.map((p) => p.dataValues);
      });
  }

  async getColumns(tableName: string): Promise<
    {
      columnName: string;
      columnComment: string;
      dataType: string;
      characterMaximumLength: number;
      isNullable: string;
      numericPrecision: number;
      numericScale: number;
      columnKey: '' | 'PRI' | 'UNI' | 'MUL';
    }[]
  > {
    return this.sequelize.models.columns
      .findAll({
        where: {
          tableSchema: this.database,
          tableName: tableName,
        },
        attributes: [
          'columnName',
          'columnComment',
          'dataType',
          'characterMaximumLength',
          'isNullable',
          'numericPrecision',
          'numericScale',
          'columnKey',
        ],
      })
      .then((list) => {
        return list.map((p) => p.dataValues);
      });
  }
}
