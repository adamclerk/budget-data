import {flags} from '@oclif/command'

import Base from '../../shared/base'

export default class ListLogin extends Base {
  static description = 'list all of the logins currently available'

  static examples = [
    '$ plaid-cli login:list',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    await this.init()
    const accounts = (this.db.get('accounts') as any).value()
    // tslint:disable-next-line:no-console
    console.log(accounts)
  }
}
