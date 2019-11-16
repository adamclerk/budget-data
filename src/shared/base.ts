import { Command } from '@oclif/command';
import { IConfig } from '@oclif/config'
export class Base extends Command {
  constructor(argv: string[], config: IConfig) {
    super(argv, config);

  }
  async run() {

  }
}
