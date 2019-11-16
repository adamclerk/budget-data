import { Command } from '@oclif/command';
import { IConfig } from '@oclif/config'
import { } from 'plaid'
export class Base extends Command {
  plaidClient: any;
  constructor(argv: string[], config: IConfig) {
    super(argv, config);
  }
  async run() {

  }
}
