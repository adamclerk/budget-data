const os = require('os');
import { LokiFsAdapter } from 'lokijs';
// tslint:disable-next-line:no-duplicate-imports
import * as loki from 'lokijs';
import * as plaid from 'plaid';

import { IConfigFlags } from './base';

export class DbService {
  public accounts!: loki.Collection<Account>;
  public transactions!: loki.Collection<plaid.Transaction>;
  private db!: loki;
  constructor(private config: IConfigFlags) { }

  public async init() {
    await new Promise(resolve => {
      const autoLoad = () => {
        this.accounts = this.db.getCollection('accounts');
        if (this.accounts === null) {
          this.db.addCollection<Account>('accounts');
          this.accounts = this.db.getCollection<Account>('accounts');
        }

        this.transactions = this.db.getCollection('transactions');
        if (this.transactions === null) {
          this.db.addCollection<plaid.Transaction>('transactions', {
            unique: ['transaction_id']
          });
          this.transactions = this.db.getCollection<plaid.Transaction>(
            'transactions'
          );
        }
        resolve();
      };
      const configPath =
        this.config.configPath || `${os.homedir()}/.budget-data`;
      const configName = this.config.configName || 'default';
      let dbPath = `${configPath}/budget.${configName}`;

      if (this.config.verbose) {
        console.info(`dbPath: ${dbPath}`);
      }

      this.db = new loki(dbPath, {
        adapter: new LokiFsAdapter(),
        autoload: true,
        autoloadCallback: autoLoad,
        autosave: false,
        autosaveInterval: 0,
        throttledSaves: true
      });
    });
  }

  public async flush(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.db.saveDatabase(err => {
        const retVal = err === null ? true : false;
        resolve(retVal);
      });
    });
  }
}

// export const dbService = new DbService();

interface InternalAccount {
  id: string;
  name: string;
  mask: string;
  type: string;
  subtype: string;
}

export interface Account {
  id: string;
  payload: {
    institution: {
      name: string;
      institution_id: string;
    };
    accounts: InternalAccount[];
  };
  tokenResponse: {
    access_token: string;
    item_id: string;
    request_id: string;
    status_code: number;
  };
}
