import { Client, environments } from "plaid";
import { resolve } from "path";
import { homedir } from "os";
import { config } from "dotenv";
import * as envvar from "envvar";
class PlaidService {
  public plaidClient: Client;
  constructor() {
    const envPath = resolve(homedir(), ".plaid/.env");
    config({ path: envPath });
    let PLAID_CLIENT_ID = envvar.string("PLAID_CLIENT_ID");
    let PLAID_SECRET = envvar.string("PLAID_SECRET");
    let PLAID_PUBLIC_KEY = envvar.string("PLAID_PUBLIC_KEY");
    let PLAID_ENV = envvar.string("PLAID_ENV", "sandbox");

    this.plaidClient = new Client(
      PLAID_CLIENT_ID,
      PLAID_SECRET,
      PLAID_PUBLIC_KEY,
      environments[PLAID_ENV],
      { version: "2019-05-29" }
    );
  }
}

export const plaidService = new PlaidService();
