#!/usr/bin/env node
var pkg, path, fs, ncp, clc, args, templatePath;

pkg = require('../package.json');

path = require('path');
fs = require('fs');
ncp = require('ncp');
clc = require('cli-color');

args = {};
for (var i = 0; i < process.argv.length; i++) {
  var arg = process.argv[i];
  args[arg.split(':')[0]] = arg;
}

function k() {
  console.log(clc.reset);
  console.log(clc.green('kick ') + pkg.version);
}

if (args['--version']) {
  console.log(clc.green(pkg.version));
} else if (args.init) {
  k();

  var namespace = args.init.split(':')[1];

  if (namespace === undefined || namespace === '') {
    return console.log('  ✗', clc.red('please specify project name.'), clc.cyan('$ kick init:[NAME]'));
  }

  templatePath = path.join(__dirname, '..', 'template', 'project');
  
  if (fs.existsSync(templatePath)) {
    console.log('  ✓', clc.cyan('creating project'), clc.red(namespace));
    ncp.ncp(templatePath, process.cwd() + '/' + namespace, function(error) {
      if (error) {
        console.log('  ✗', clc.red(error));
      } else {
        console.log('  ✓', clc.cyan('project created successfuly'));
      }
    });
  } else {
    console.log('  ✗', clc.red('Couldn\'t find template path.'));
  }
}