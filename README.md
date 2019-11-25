plaid-cli
=========

get data for personal budgeting

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/plaid-cli.svg)](https://npmjs.org/package/plaid-cli)
[![Downloads/week](https://img.shields.io/npm/dw/plaid-cli.svg)](https://npmjs.org/package/plaid-cli)
[![License](https://img.shields.io/npm/l/plaid-cli.svg)](https://github.com/adamclerk/plaid-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g plaid-cli
$ plaid-cli COMMAND
running command...
$ plaid-cli (-v|--version|version)
plaid-cli/0.0.0 darwin-x64 node-v10.16.3
$ plaid-cli --help [COMMAND]
USAGE
  $ plaid-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`plaid-cli help [COMMAND]`](#plaid-cli-help-command)
* [`plaid-cli login:add`](#plaid-cli-loginadd)
* [`plaid-cli login:list`](#plaid-cli-loginlist)
* [`plaid-cli login:remove [ID]`](#plaid-cli-loginremove-id)
* [`plaid-cli stats`](#plaid-cli-stats)
* [`plaid-cli transactions:download`](#plaid-cli-transactionsdownload)

## `plaid-cli help [COMMAND]`

display help for plaid-cli

```
USAGE
  $ plaid-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `plaid-cli login:add`

launch a webpage and server to provide login credentials

```
USAGE
  $ plaid-cli login:add

OPTIONS
  -c, --configName=configName  config to load. default will load `~/.budget-data/.default.config` provide a value it
                               will load `~/.budget-data/.{value}.config`

  -h, --help                   show CLI help

  -p, --configPath=configPath  path to put all data. this defaults to ~/.budget-data/*

  -v, --verbose

EXAMPLE
  $ budget-data login:add
```

_See code: [src/commands/login/add.ts](https://github.com/adamclerk/plaid-cli/blob/v0.0.0/src/commands/login/add.ts)_

## `plaid-cli login:list`

list all of the logins currently available

```
USAGE
  $ plaid-cli login:list

OPTIONS
  -c, --configName=configName  config to load. default will load `~/.budget-data/.default.config` provide a value it
                               will load `~/.budget-data/.{value}.config`

  -d, --details

  -h, --help                   show CLI help

  -p, --configPath=configPath  path to put all data. this defaults to ~/.budget-data/*

  -v, --verbose

EXAMPLE
  $ budget-data login:list
```

_See code: [src/commands/login/list.ts](https://github.com/adamclerk/plaid-cli/blob/v0.0.0/src/commands/login/list.ts)_

## `plaid-cli login:remove [ID]`

remove a login from local storage

```
USAGE
  $ plaid-cli login:remove [ID]

OPTIONS
  -c, --configName=configName  config to load. default will load `~/.budget-data/.default.config` provide a value it
                               will load `~/.budget-data/.{value}.config`

  -h, --help                   show CLI help

  -p, --configPath=configPath  path to put all data. this defaults to ~/.budget-data/*

  -v, --verbose

EXAMPLE
  $ budget-data login:delete [id]
```

_See code: [src/commands/login/remove.ts](https://github.com/adamclerk/plaid-cli/blob/v0.0.0/src/commands/login/remove.ts)_

## `plaid-cli stats`

list all of the logins currently available

```
USAGE
  $ plaid-cli stats

OPTIONS
  -c, --configName=configName  config to load. default will load `~/.budget-data/.default.config` provide a value it
                               will load `~/.budget-data/.{value}.config`

  -h, --help                   show CLI help

  -p, --configPath=configPath  path to put all data. this defaults to ~/.budget-data/*

  -v, --verbose

EXAMPLE
  $ budget-data login:list
```

_See code: [src/commands/stats/index.ts](https://github.com/adamclerk/plaid-cli/blob/v0.0.0/src/commands/stats/index.ts)_

## `plaid-cli transactions:download`

download transactions for a given account

```
USAGE
  $ plaid-cli transactions:download

OPTIONS
  -a, --accountId=accountId    (required) this is the accountId you want to download from

  -c, --configName=configName  config to load. default will load `~/.budget-data/.default.config` provide a value it
                               will load `~/.budget-data/.{value}.config`

  -h, --help                   show CLI help

  -p, --configPath=configPath  path to put all data. this defaults to ~/.budget-data/*

  -v, --verbose

EXAMPLE
  $ budget-data transactions:download
```

_See code: [src/commands/transactions/download.ts](https://github.com/adamclerk/plaid-cli/blob/v0.0.0/src/commands/transactions/download.ts)_
<!-- commandsstop -->
