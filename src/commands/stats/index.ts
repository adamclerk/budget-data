import { flags, Command } from "@oclif/command";
import { dbService } from "../../shared/db";
import * as pluralize from "pluralize";

export default class Stats extends Command {
  static description = "list all of the logins currently available";

  static examples = ["$ plaid-cli login:list"];

  static flags = {
    help: flags.help({ char: "h" })
  };

  async run() {
    try {
      await dbService.initDatabase();
      const accounts = dbService.accounts.find();
      console.log("I know about:");
      console.log(` ${pluralize("account", accounts.length, true)}`);
      const transactions = dbService.transactions.find();
      console.log(` ${pluralize("transaction", transactions.length, true)}`);
    } catch (e) {
      console.log(e);
    } finally {
      process.exit();
    }
  }
}
