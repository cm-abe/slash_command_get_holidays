# Useful commands

Commands:

* `tsas init`     Create a new, empty Typed Lambda project from a template.
* `tsas param`    Manage application parameters, [push|list]
* `tsas deploy`   Deploy aws resources, [serverless|sls|cloudformation|cfn]
* `tsas display`  Display information [cfn-parameters]

Options:

* `--version `  Show version number                                      [boolean]
* `--region  `  Use the indicated AWS region to override default in config file. [string]
* `--env, -e `  Environment name; such as dev, stg, prod...               [string]
* `--verbose `  Set verbose mode.                       [boolean] [default: false]
* `-h, --help`  Show help                                                [boolean]

# Development Environment

* intelli-espower-loader
* power-assert
  * require install type
* mocha
  * require install type
* TSLint
* nyc

## With VSCode

* `ts-node` for `Run Code`

### Add task

Add below tasks for `tasks.json`

```
        {
            "label": "ts-node",
            "type": "shell",
            "command": "npm-run ts-node ${relativeFile}"
        },
        {
            "label": "mocha",
            "type": "shell",
            "command": "mocha -r ts-node/register ${relativeFile}"
        }
```