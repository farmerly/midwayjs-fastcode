import yargs from 'yargs';
import code from './commands/code';

yargs.command('code', '生成代码', code).demandCommand(1, '请输入命令').argv;
