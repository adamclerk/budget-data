import { flags, Command } from "@oclif/command";
import { dbService } from "../../shared/db";
import cli from "cli-ux";
import * as pluralize from "pluralize";

export default class RemoveLogin extends Command {
  static description = "remove a login from local storage";

  static examples = ["$ plaid-cli login:delete [id]"];

  static flags = {
    help: flags.help({ char: "h" })
  };

  static args = [
    {
      name: "id"
    }
  ];

  async run() {
    try {
      await dbService.initDatabase();
      const { args } = this.parse(RemoveLogin);
      const query = { id: { $contains: args.id } };
      const accounts = dbService.accounts.find(query);
      console.log(`Found ${pluralize("account", accounts.length, true)}`);
      accounts.forEach(x => {
        console.log(`Id: ${x.id}`);
      });
      const canDelete = await cli.confirm(
        `Are you sure you want to remove ${pluralize("this", accounts.length)}`
      );

      if (canDelete) {
        dbService.accounts.remove(accounts);
        await dbService.flush();
        console.log(`${pluralize("account", accounts.length, true)} removed`);
      }
      console.log();
    } catch (e) {
      console.log(e);
    } finally {
      process.exit();
    }
  }
}
