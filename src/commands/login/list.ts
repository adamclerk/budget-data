import {Command, flags} from '@oclif/command'
import {Glob} from 'glob-promise';
import {homedir} from 'os'
import { Base } from '../../shared/base';

export default class ListLogin extends Base {
  static description = 'list all of the logins currently available'

  static examples = [
    `$ plaid-cli login:list`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
  }

  static args = [{name: 'file'}]

  async run() {
    super._run();
    const accountFolder = `${homedir()}/.plaid/accounts/*.json`;
    new Glob(accountFolder)
    const {args, flags} = this.parse(ListLogin);
  }
}
