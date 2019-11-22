import {config} from 'dotenv';
import {string as envvarString} from 'envvar';
import {homedir} from 'os';
import {resolve} from 'path';
import {Client, environments} from 'plaid';
export class PlaidService {
  public plaidClient: Client;
  constructor(c: string | undefined) {
    let envPath = resolve(homedir(), '.plaid/.env');
    if (c) {
      envPath = resolve(homedir(), `.plaid/.${c}.env`);
    }
    config({path: envPath});
    let PLAID_CLIENT_ID = envvarString('PLAID_CLIENT_ID');
    let PLAID_SECRET = envvarString('PLAID_SECRET');
    let PLAID_PUBLIC_KEY = envvarString('PLAID_PUBLIC_KEY');
    let PLAID_ENV = envvarString('PLAID_ENV', 'sandbox');

    this.plaidClient = new Client(
      PLAID_CLIENT_ID,
      PLAID_SECRET,
      PLAID_PUBLIC_KEY,
      environments[PLAID_ENV],
      {version: '2019-05-29'}
    );
  }
}
