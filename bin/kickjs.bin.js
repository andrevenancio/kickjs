#!/usr/bin/env node

var log = require('../lib/log');
var pkg = require('../package.json');

var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var ncp = require('ncp');

var interval = null;
var i = 0;

var args = {};
for (var i = 0; i < process.argv.length; i++) {
  var arg = process.argv[i];
  args[arg.split(':')[0]] = arg;
}

if (args['-i']) {
  init();
} else if (args['-v']) {
  log.info(pkg.version);
}

function credits() {
  log.clear();
  log.info('kickjs', pkg.version);
}

function init() {
  copyTemplate();
}

function copyTemplate() {
  var namespace = args['-i'].split(':')[1];

  if (namespace === undefined || namespace === '') {
    return log.fail('please specify a namespace');
  }

  if (fs.existsSync(namespace)) {
    return log.fail('specified namespace already exist');
  } else {
    credits();

    var templatePath = path.join(__dirname, '..', 'template', 'project');

    if (fs.existsSync(templatePath)) {
      ncp.ncp(templatePath, process.cwd() + '/' + namespace, function(error) {
        if (error) {
          log.fail(error);
        } else {
          log.success('template copied to', namespace);
          
          showLoading('please wait');
          bash('npm install --prefix ./' + namespace, function() {
            hideLoading();
            log.success('node_modules installed');
            log.info('\ntype:\ncd', namespace, '\ngrunt app');
          });
        }
      });
    } else {
      log.fail('couldn\'t find template');
    }
  }
}

function showLoading(message) {
  interval = setInterval(function() {
    updateLoading(message);
  }, 300);
}

function updateLoading(msn) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  i = (i + 1) % 5;
  var dots = new Array(i + 1).join(".");
  process.stdout.write(msn + dots);
}

function hideLoading() {
  clearInterval(interval);
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
}

function bash(script, onSuccess, onError) {
  child_process.exec(script, function(error, stdout, stderr) {
    if (error) {
      return onError();
    } else {
      return onSuccess();
    }
  });
}