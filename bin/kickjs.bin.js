#!/usr/bin/env node
var pkg = require('../package.json');
var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var walk = require('walk');
var prompt = require('prompt');
var colors = require('colors/safe');

var interval = null;
var template = 'default';
var title = '';
var description = '';
var i = 0;
var startTime = 0;

var q = 'install npm modules? (y/n)';
var validation = {
    title: {
        pattern: /^[a-zA-Z0-9\s\-]+$/,
        message: 'Name must be letters, numbers, spaces or dashes',
        required: true
    },
    description: {
        required: false
    }
};
validation[q] = {
    pattern: /^(?:y|n)+$/,
    message: 'Type y or n.',
    required: false
}

console.log('');
console.log(colors.cyan('kickjs'), pkg.version);
console.log(colors.gray('Please enter your project details:'));
prompt.start();
prompt.message = '';
prompt.get({
    properties: validation
}, function(err, result) {
    if (!err) {
        title = result.title;
        description = result.description;
        init(result[q] === 'y');
    }
});

function init(npmInstall) {
    startTime = Date.now();

    clearFolder(function() {
        createDirectory(function() {
            copyTemplate(function() {
                updateFileReferences(function() {
                    if (npmInstall) {
                        installNpmDependencies(function() {
                            end();
                        });
                    } else {
                        end();
                    }
                });
            });
        });
    })
}

function end() {
    console.log('');
    console.log(colors.gray('completed in'), colors.green(Number(Date.now() - startTime) + 'ms'));
}

function createDirectory(onComplete) {
    bash('mkdir "' + title + '"', function(e) {
        onComplete();
    });
}

function clearFolder(onComplete) {
    bash('rm -rf "' + title + '"', function(e) {
        onComplete();
    });
}

function copyTemplate(onComplete) {
    var templatePath = path.join(__dirname, '..', 'template', template);

    if (fs.existsSync(templatePath)) {
        bash('cp -R ' + templatePath + '/ "' + process.cwd() + '/' + title + '"', function() {
            onComplete();
        });
    }
}

function installNpmDependencies(onComplete) {
    showLoading();
    bash('cd "' + title + '" && npm install --prefix .', function() {
        hideLoading();
        onComplete();
    });
}


function updateFileReferences(onComplete) {
    var walker = walk.walk('./' + title, {
        followLinks: false,
        filters: ['node_modules']
    });

    walker.on('file', function(root, fileStats, next) {
        parseFile(root + '/' + fileStats.name);
        next();
    });

    walker.on('end', function() {
        onComplete();
    });
}

function parseFile(file) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) return console.logt(err);

        var result = data
            .replace(/__TITLE__/g, title.replace(/ /g, "\-"))
            .replace(/__DESCRIPTION__/g, description);

        fs.writeFile(file, result, 'utf8', function(err) {
            if (err) return console.log(err);
        });
    });
}

function showLoading() {
    interval = setInterval(function() {
        updateLoading('please wait');
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
