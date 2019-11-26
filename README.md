budget-data
=========

get data for personal budgeting

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/budget-data.svg)](https://npmjs.org/package/budget-data)
[![Downloads/week](https://img.shields.io/npm/dw/budget-data.svg)](https://npmjs.org/package/budget-data)
[![License](https://img.shields.io/npm/l/budget-data.svg)](https://github.com/adamclerk/budget-data/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g budget-data
$ budget-data COMMAND
running command...
$ budget-data (-v|--version|version)
budget-data/0.0.0 darwin-x64 node-v10.16.3
$ budget-data --help [COMMAND]
USAGE
  $ budget-data COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`budget-data help [COMMAND]`](#budget-data-help-command)
* [`budget-data login:add`](#budget-data-loginadd)
* [`budget-data login:list`](#budget-data-loginlist)
* [`budget-data login:remove [ID]`](#budget-data-loginremove-id)
* [`budget-data stats`](#budget-data-stats)
* [`budget-data transactions:download`](#budget-data-transactionsdownload)

## `budget-data help [COMMAND]`

display help for budget-data

```
USAGE
  $ budget-data help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `budget-data login:add`

launch a webpage and server to provide login credentials

```
USAGE
  $ budget-data login:add

OPTIONS
  -c, --configName=configName  config to load. default will load `~/.budget-data/.default.config` provide a value it
                               will load `~/.budget-data/.{value}.config`

  -h, --help                   show CLI help

  -p, --configPath=configPath  path to put all data. this defaults to ~/.budget-data/*

  -v, --verbose

EXAMPLE
  $ budget-data login:add
```

_See code: [src/commands/login/add.ts](https://github.com/adamclerk/budget-data/blob/v0.0.0/src/commands/login/add.ts)_

## `budget-data login:list`

list all of the logins currently available

```
USAGE
  $ budget-data login:list

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

_See code: [src/commands/login/list.ts](https://github.com/adamclerk/budget-data/blob/v0.0.0/src/commands/login/list.ts)_

## `budget-data login:remove [ID]`

remove a login from local storage

```
USAGE
  $ budget-data login:remove [ID]

OPTIONS
  -c, --configName=configName  config to load. default will load `~/.budget-data/.default.config` provide a value it
                               will load `~/.budget-data/.{value}.config`

  -h, --help                   show CLI help

  -p, --configPath=configPath  path to put all data. this defaults to ~/.budget-data/*

  -v, --verbose

EXAMPLE
  $ budget-data login:delete [id]
```

_See code: [src/commands/login/remove.ts](https://github.com/adamclerk/budget-data/blob/v0.0.0/src/commands/login/remove.ts)_

## `budget-data stats`

list all of the logins currently available

```
USAGE
  $ budget-data stats

OPTIONS
  -c, --configName=configName  config to load. default will load `~/.budget-data/.default.config` provide a value it
                               will load `~/.budget-data/.{value}.config`

  -h, --help                   show CLI help

  -p, --configPath=configPath  path to put all data. this defaults to ~/.budget-data/*

  -v, --verbose

EXAMPLE
  $ budget-data login:list
```

_See code: [src/commands/stats/index.ts](https://github.com/adamclerk/budget-data/blob/v0.0.0/src/commands/stats/index.ts)_

## `budget-data transactions:download`

download transactions for a given account

```
USAGE
  $ budget-data transactions:download

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

_See code: [src/commands/transactions/download.ts](https://github.com/adamclerk/budget-data/blob/v0.0.0/src/commands/transactions/download.ts)_
<!-- commandsstop -->
