import Command, {flags} from '@oclif/command';
import {Input} from '@oclif/parser';
import * as dotenv from 'dotenv';
import {homedir} from 'os';
import {resolve} from 'path';

import {DbService} from './db';
import {PlaidService} from './plaid';

export default abstract class extends Command {
  static flags = {
    verbose: flags.boolean({
      char: 'v'
    }),
    configName: flags.string({
      char: 'c',
      description:
        'config to load. default will load `~/.budget-data/.default.config` provide a value it will load `~/.budget-data/.{value}.config`',
      env: 'BUDGET_DATA_CONFIG',
    }),
    configPath: flags.string({
      char: 'p',
      description: 'path to put all data. this defaults to ~/.budget-data/*'
    })
    // ,
    // json: flags.boolean({
    //   exclusive: ['csv']
    // }),
    // csv: flags.boolean({
    //   exclusive: ['json']
    // })
  };
  static strict = false;
  protected dbService!: DbService;
  protected plaidService!: PlaidService;

  async init() {
    const {flags} = this.parse(this.constructor as Input<any>);
    if (flags.verbose) {
      console.log(flags);
    }
    await this.loadConfig(flags);
    // this.flags = flags;
    this.dbService = new DbService(flags);
    await this.dbService.init();

    this.plaidService = await new PlaidService(flags);
  }

  private async loadConfig(flags: IConfigFlags) {
    const configName = flags.configName || 'default';
    const configPath = flags.configPath || resolve(homedir(), '.budget-data');
    let envPath = `${configPath}/.env.${configName}`;
    if (flags.verbose) {
      console.log(`envPath: ${envPath}`);
    }
    dotenv.config({path: envPath});
  }
}

export interface IConfigFlags {
  configName: string | undefined;
  configPath: string | undefined;
  verbose: boolean | undefined;
}
