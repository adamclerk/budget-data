import { flags, Command } from "@oclif/command";
import { dbService, Transaction } from "../../shared/db";
import * as pluralize from "pluralize";
import { plaidService } from "../../shared/plaid";

export default class DownloadTransactions extends Command {
  static description = "download transactions for a given account";

  static examples = ["$ plaid-cli transactions:download"];

  static flags = {
    help: flags.help({ char: "h" }),
    accountId: flags.string()
  };

  async run() {
    try {
      const cmd = this.parse(DownloadTransactions);
      await dbService.initDatabase();
      const accounts = dbService.accounts.findOne({
        id: { $contains: cmd.flags.accountId }
      });
      const accessToken = accounts.tokenResponse.access_token;
      let count = 50;
      let offset = 0;
      let allTransactions: Transaction[] = [];
      console.log(`First Page: Start at ${offset} retrieving ${count}`);
      let {
        total_transactions,
        transactions
      } = await plaidService.plaidClient.getTransactions(
        accessToken,
        "2018-01-01",
        "2019-01-30",
        {
          count,
          offset
        }
      );
      allTransactions.push(...transactions);
      while (allTransactions.length < total_transactions) {
        offset = allTransactions.length;
        console.log(`Next Page: Start at ${offset} retrieving ${count}`);
        let response = await plaidService.plaidClient.getTransactions(
          accessToken,
          "2018-01-01",
          "2019-01-30",
          {
            count,
            offset
          }
        );
        total_transactions = response.total_transactions;
        allTransactions.push(...response.transactions);
      }
      allTransactions.forEach(t => {
        try {
          dbService.transactions.insert(t);
        } catch (e) {
          let err: Error = e;
          if (err.message.indexOf("Duplicate key") === -1) {
            console.log(e);
          }
        }
      });

      await dbService.flush();
      console.log(
        `Downloaded ${pluralize("transaction", allTransactions.length, true)}`
      );
      // console.log(transactions.transactions);
    } catch (e) {
      console.log(e);
    } finally {
      process.exit();
    }
  }
}
