import { flags } from '@oclif/command';
import * as pluralize from 'pluralize';

import BaseCommand from '../../shared/base';

export default class Stats extends BaseCommand {
  static description = 'list all of the logins currently available';

  static examples = ['$ plaid-cli login:list'];

  static flags = {
    ...BaseCommand.flags,
    help: flags.help({ char: 'h' })
  };

  async run() {
    try {
      const accounts = this.dbService.accounts.find();
      console.log('I know about:');
      console.log(` ${pluralize('account', accounts.length, true)}`);
      const transactions = this.dbService.transactions.find();
      console.log(` ${pluralize('transaction', transactions.length, true)}`);
    } catch (e) {
      console.log(e);
    }
  }
}
