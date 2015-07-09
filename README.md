# kickjs

Boilerplate templates for quick prototyping. <br/>
[kickjs](https://www.npmjs.com/package/kickjs) allows you to quickly start a new project from a command line instruction.
```shell
kickjs -n:TEMPLATE[optional]:TITLE[optional]:DESCRIPTION[optional]
```

## Installation
Make sure you have [npm/node](http://nodejs.org/) installed. <br/>
Run the npm install command with the -g option:
```shell
npm install -g kickjs
```
## Features
|                                        | Default            | Three.js           |
| -------------------------------------- | ------------------ | ------------------ |
| [grunt.js](http://gruntjs.com/)        | :heavy_check_mark: | :heavy_check_mark: |
| [sass](http://sass-lang.com/)          | :heavy_check_mark: | :heavy_check_mark: |
| [CoffeeScript](http://coffeescript.org/)|                   | :heavy_check_mark: |

## Create a new project

### Default
Creates a new javascript based project.<br/>
Downloads all [npm](https://www.npmjs.com/) dependencies. Runs grunt task and starts a server.
```shell
kickjs -n
```
