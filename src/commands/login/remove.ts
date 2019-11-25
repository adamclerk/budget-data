import { flags } from '@oclif/command';
import * as pluralize from 'pluralize';

import BaseCommand from '../../shared/base';

export default class RemoveLogin extends BaseCommand {
  static description = 'remove a login from local storage';

  static examples = ['$ budget-data login:delete [id]'];

  static flags = {
    ...BaseCommand.flags,
    help: flags.help({ char: 'h' })
  };

  static args = [
    {
      name: 'id'
    }
  ];

  async run() {
    try {
      const { args } = this.parse(RemoveLogin);
      const query = { id: { $contains: args.id } };
      const accounts = this.dbService.accounts.find(query);
      console.log(`Found ${pluralize('account', accounts.length, true)}`);
      accounts.forEach(x => {
        console.log(`Id: ${x.id}`);
      });
      this.dbService.accounts.remove(accounts);
      await this.dbService.flush();
      console.log(`${pluralize('account', accounts.length, true)} removed`);
      console.log();
    } catch (e) {
      console.log(e);
    }
  }
}
