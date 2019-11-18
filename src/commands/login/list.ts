import { flags, Command } from "@oclif/command";
import { dbService } from "../../shared/db";

export default class ListLogin extends Command {
  static description = "list all of the logins currently available";

  static examples = ["$ plaid-cli login:list"];

  static flags = {
    help: flags.help({ char: "h" }),
    details: flags.boolean({ char: "d" })
  };

  async run() {
    try {
      const cmd = this.parse(ListLogin);
      await dbService.initDatabase();
      const accounts = dbService.accounts.find();
      accounts.forEach(x => {
        console.log(`Institution: ${x.payload.institution.name}`);
        console.log(`Id: ${x.id}`);
        console.log(`Accounts: ${x.payload.accounts.length}`);
        if (cmd.flags.details) {
          x.payload.accounts.forEach(x => {
            console.log(`  Name: ${x.name}`);
            console.log(`  Type: ${x.type}`);
            console.log(``);
          });
        }
        console.log(``);
      });
    } catch (e) {
      console.log(e);
    } finally {
      process.exit();
    }
  }
}
