import {Command, flags} from '@oclif/command';
import * as dotenv from 'dotenv';
import {homedir} from 'os';
import {resolve} from 'path';

import {DbService} from './db';
import {PlaidService} from './plaid';

export abstract class BaseCommand extends Command {
  static flags = {
    config: flags.string({
      char: 'c',
      description:
        'config to load. default will load ~/.budget-data/.config provide a value it will load ~/.budget-data/.{value}.config',
      env: 'BUDGET_DATA_CONFIG'
    }),
    json: flags.boolean({
      exclusive: ['csv']
    }),
    csv: flags.boolean({
      exclusive: ['json']
    })
  };
  protected dbService!: DbService;
  protected plaidService!: PlaidService;

  async init() {
    const {flags} = this.parse(BaseCommand);
    await this.loadConfig(flags);
    this.dbService = new DbService(flags.config);
    await this.dbService.init();

    this.plaidService = await new PlaidService(flags.config);
  }

  private async loadConfig(flags: IConfigFlag) {
    let envPath = resolve(homedir(), '.plaid/.env');
    if (flags.config) {
      envPath = resolve(homedir(), `.plaid/.${flags.config}.env`);
    }

    dotenv.config({path: envPath});
  }
}

export interface IConfigFlag {
  config: string | undefined;
}
