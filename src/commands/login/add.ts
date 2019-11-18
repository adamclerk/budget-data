import { Command, flags } from "@oclif/command";

import { runServer } from "../../server";

export default class AddLogin extends Command {
  static description =
    "launch a webpage and server to provide login credentials";

  static examples = ["$ plaid-cli login:add"];

  static flags = {
    help: flags.help({ char: "h" })
  };

  async run() {
    try {
      await runServer();
      console.log("Command done");
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    } finally {
      process.exit();
    }
  }
}
