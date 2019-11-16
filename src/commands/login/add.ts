import {Command, flags} from '@oclif/command'
import { runServer } from '../../server';
import { glob } from 'glob';

export default class AddLogin extends Command {
  static description = 'launch a webpage and server to provide login credentials'

  static examples = [
    `$ plaid-cli login:add`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(AddLogin);
    runServer();
  }
}
