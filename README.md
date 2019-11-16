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
* [`plaid-cli hello [FILE]`](#plaid-cli-hello-file)
* [`plaid-cli help [COMMAND]`](#plaid-cli-help-command)
* [`plaid-cli login:add`](#plaid-cli-loginadd)
* [`plaid-cli login:list`](#plaid-cli-loginlist)

## `plaid-cli hello [FILE]`

describe the command here

```
USAGE
  $ plaid-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ plaid-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/adamclerk/plaid-cli/blob/v0.0.0/src/commands/hello.ts)_

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
  -h, --help  show CLI help

EXAMPLE
  $ plaid-cli login:add
```

_See code: [src/commands/login/add.ts](https://github.com/adamclerk/plaid-cli/blob/v0.0.0/src/commands/login/add.ts)_

## `plaid-cli login:list`

list all of the logins currently available

```
USAGE
  $ plaid-cli login:list

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ plaid-cli login:list
```

_See code: [src/commands/login/list.ts](https://github.com/adamclerk/plaid-cli/blob/v0.0.0/src/commands/login/list.ts)_
<!-- commandsstop -->
