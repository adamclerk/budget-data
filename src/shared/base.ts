import { Command, flags } from "@oclif/command";
import { homedir } from "os";
import * as dotenv from "dotenv";
import { resolve } from "path";

export abstract class BaseCommand extends Command {
  static flags = {
    config: flags.string({
      char: "c",
      description:
        "config to load. default will load ~/.budget-data/.config provide a value it will load ~/.budget-data/.{value}.config",
      env: "BUDGET_DATA_CONFIG"
    }),
    json: flags.boolean({
      exclusive: ["csv"]
    }),
    csv: flags.boolean({
      exclusive: ["json"]
    })
  };

  async loadConfig(flags: IConfigFlag) {
    let envPath = resolve(homedir(), ".plaid/.env");
    if (flags.config) {
      envPath = resolve(homedir(), `.plaid/.${flags.config}.env`);
    }

    dotenv.config({ path: envPath });
  }
}

export interface IConfigFlag {
  config: string | undefined;
}
