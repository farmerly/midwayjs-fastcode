import FactoryManager from '../templates/factory-manager';
import Bb from 'bluebird';

export default async (table: any, tableInfo: any, templateList: any) => {
  const factory = new FactoryManager();
  await Bb.each(templateList, async (p: any) => {
    const generator = factory.getGenerator(p.name);
    await generator.generate(table, tableInfo, p.path);
  });
};
