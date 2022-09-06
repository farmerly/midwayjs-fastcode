import { format } from 'date-fns';
import * as fs from 'fs';
import { Sequelize } from 'sequelize';

const getConfig = (rcInfo, env) => {
  return fs.existsSync(rcInfo.config) ? require(rcInfo.config)[env] : undefined;
};

export default async (rcInfo, env) => {
  const config = getConfig(rcInfo, env);

  console.log(config);
  const sequelize = new Sequelize(config);

  try {
    await sequelize.authenticate();
  } catch (error) {
    throw new Error(`db connect error:${error}`);
  }
  await sequelize.close();
};
