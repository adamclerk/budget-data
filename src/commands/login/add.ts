import { flags } from '@oclif/command';

import { runServer } from '../../server';
import BaseCommand from '../../shared/base';

export default class AddLogin extends BaseCommand {
  static description =
    'launch a webpage and server to provide login credentials';

  static examples = ['$ budget-data login:add'];

  static flags = {
    ...BaseCommand.flags,
    help: flags.help({ char: 'h' })
  };

  async run() {
    try {
      const { flags } = this.parse(AddLogin);
      await runServer(flags);
      console.log('Command done');
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }
}
