import EntityGenerator from './entity/generator';
import DtoGenerator from './dto/generator';
import ControllerGenerator from './controller/generator';
import ServiceGenerator from './service/generator';

export default class FactoryManager {
  getGenerator(type: string) {
    if (!type) return;

    if (type === 'entity') {
      return new EntityGenerator();
    } else if (type === 'dto') {
      return new DtoGenerator();
    } else if (type === 'controller') {
      return new ControllerGenerator();
    } else if (type === 'service') {
      return new ServiceGenerator();
    }
  }
}
