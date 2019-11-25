import { flags } from '@oclif/command';

import BaseCommand from '../../shared/base';

export default class ListLogin extends BaseCommand {
  static description = 'list all of the logins currently available';

  static examples = ['$ plaid-cli login:list'];

  static flags = {
    ...BaseCommand.flags,
    help: flags.help({ char: 'h' }),
    details: flags.boolean({ char: 'd' })
  };

  async run() {
    try {
      const { flags } = this.parse(ListLogin);
      const accounts = this.dbService.accounts.find();
      accounts.forEach(x => {
        console.log(`Institution: ${x.payload.institution.name}`);
        console.log(`Id: ${x.id}`);
        console.log(`Accounts: ${x.payload.accounts.length}`);
        if (flags.details) {
          x.payload.accounts.forEach(x => {
            console.log(`  Name: ${x.name}`);
            console.log(`  Type: ${x.type}`);
            console.log('');
          });
        }
        console.log('');
      });
    } catch (e) {
      console.log(e);
    }
  }
}
