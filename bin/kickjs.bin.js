#!/usr/bin/env node

var pkg = require('../package.json');

var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var walk = require('walk');

var interval = null;
var template = '';
var title = '';
var description = '';

var args = {};

for (var i = 0; i < process.argv.length; i++) {
    var arg = process.argv[i];
    args[arg.split(':')[0]] = arg;
}

if (args['-n']) {
    template = args['-n'].split(':')[1] || 'default';
    title = args['-n'].split(':')[2] || 'kickjs';
    description = args['-n'].split(':')[3] || ('kickjs ' + template + 'template');
    init();
} else if (args['-v']) {
    console.log(pkg.version);
} else {
    credits();
    console.log('');
    console.log('Help:');
    console.log('-v', '     displays current version');
    console.log('-n', '     creates new project. e.g.: kickjs -n:coffee');
}

function credits() {
    console.log('kickjs', pkg.version);
}

function init() {
    credits();

    copyTemplate(function() {
        console.log(template, 'template copied');
        updateFileReferences(function() {
            console.log('file references changed');
            installNpmDependencies(function() {
                console.log('npm dependencies installed');
                compileGrunt(function() {
                    console.log('done.');
                });
            });
        });
    });
}

function clearFolder(onComplete) {
    bash('rm -rf *', function(e) {
        console.log('directory clear');
        onComplete();
    });
}

function copyTemplate(onComplete) {

    var templatePath = path.join(__dirname, '..', 'template', template);

    if (fs.existsSync(templatePath)) {
        clearFolder(function() {
            bash('cp -R ' + templatePath + '/ "' + process.cwd() + '"', function() {
                onComplete();
            });
        });

    } else {
        console.log('unknown template.');
    }
}

function installNpmDependencies(onComplete) {
    showLoading('please wait');
    bash('npm install --prefix .', function() {
        hideLoading();
        onComplete();
    });
}

function compileGrunt(onComplete) {
    showLoading('please wait');
    bash('grunt', function() {
        hideLoading();
        onComplete();
    });
}

function updateFileReferences(onComplete) {
    var files = 0;

    var walker = walk.walk('.', {
        followLinks: false,
        filters: ['node_modules']
    });

    walker.on('file', function(root, fileStats, next) {
        var ns = fileStats.name === 'package.json' ? template.replace(/ /g, "\\-") : template;
        parseFile(root + '/' + fileStats.name, {
            template: ns
        });
        files++;
        next();
    });

    walker.on('end', function() {
        onComplete();
    });
}

function parseFile(file, references) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) return console.logt(err);

        var result = data
            .replace(/__TYPE__/g, references.template)
            .replace(/__TITLE__/g, title)
            .replace(/__DESCRIPTION__/g, description);

        fs.writeFile(file, result, 'utf8', function(err) {
            if (err) return console.log(err);
        });
    });
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

function bash(script, onSuccess) {
    child_process.exec(script, function(error, stdout, stderr) {
        if (error) {
            return console.log(error);
        } else {
            return onSuccess();
        }
    });
}
