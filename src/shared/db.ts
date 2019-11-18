const os = require('os')
// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
// const adapter = new FileSync(`${os.homedir()}/.plaid/db.json`)
// export const db = low(adapter)

import * as lowDb from 'lowdb'
import * as FileAsync from 'lowdb/adapters/FileAsync'

class DbService {
  public db!: lowDb.LowdbAsync<any>
  constructor() {
    this.initDatabase()
  }

  public async initDatabase() {
    const adapter = new FileAsync(`${os.homedir()}/.plaid/db.json`)
    this.db = await lowDb(adapter)

    await this.db.defaults({
      accounts: []
    }).write()
  }
}

export default new DbService()
