import {Command} from '@oclif/command'
import * as lowDb from 'lowdb'
import * as FileAsync from 'lowdb/adapters/FileAsync'
import {homedir} from 'os'

export default abstract class extends Command {
  public db!: lowDb.LowdbAsync<any>
  async init() {
    // do some initialization
    const adapter = new FileAsync(`${homedir()}/.plaid/db.json`)
    this.db = await lowDb(adapter)
    await this.db.defaults({
      accounts: []
    }).write()
  }
}
