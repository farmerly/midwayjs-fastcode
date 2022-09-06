# midway fastcode

## sequelize

### database 配置文件

默认配置文件使用 config/config.json, 可以通过 `sequelize init` 命令生成

```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### .sequelizerc 配置文件

项目根目录下的 .sequelizerc 文件

```js
const path = require('path');

module.exports = {
  config: path.join(__dirname, 'database/config/config.json'),
  'migrations-path': path.join(__dirname, 'database/migrations'),
  'seeders-path': path.join(__dirname, 'database/seeders'),
  'models-path': path.join(__dirname, 'src/lib/models'),
};
```
