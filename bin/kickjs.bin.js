#!/usr/bin/env node
const pkg = require('../package.json');
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const walk = require('walk');
const prompt = require('prompt');
const colors = require('colors/safe');

let title = '';
let description = '';
let template = '';

let startTime = 0;

// --------------------------------------------------------------- AUX functions
function bash(script, onSuccess) {
    childProcess.exec(script, (error) => {
        if (error) {
            return console.log(error);
        }
        return onSuccess();
    });
}

function clearFolder(onComplete) {
    bash(`rm -rf ${title}`, () => {
        onComplete();
    });
}

function createDirectory(onComplete) {
    bash(`mkdir ${title}`, () => {
        onComplete();
    });
}

function copyTemplate(onComplete) {
    const templatePath = path.join(__dirname, '..', 'kickjs-templates', template);

    if (fs.existsSync(templatePath)) {
        bash(`cp -R ${templatePath}/ ${process.cwd()}/${title}`, () => {
            onComplete();
        });
    } else {
        console.log(colors.red('template not found'), colors.gray(templatePath));
    }
}

function parseFile(file) {
    fs.readFile(file, 'utf8', (err1, data) => {
        if (err1) return console.logt(err1);

        const result = data
            .replace(/__TITLE__/g, title.replace(/ /g, '-'))
            .replace(/__DESCRIPTION__/g, description);

        fs.writeFile(file, result, 'utf8', (err2) => {
            if (err2) {
                console.log(err2);
            }
            return false;
        });
        return false;
    });
}

function updateFileReferences(onComplete) {
    const walker = walk.walk(`./${title}`, {
        followLinks: false,
        filters: ['node_modules'],
    });

    walker.on('file', (root, fileStats, next) => {
        parseFile(`${root}/${fileStats.name}`);
        next();
    });

    walker.on('end', () => {
        onComplete();
    });
}

function end() {
    console.log('');
    console.log(colors.gray('completed in'), colors.green(`${Number(Date.now() - startTime)}ms`));
}

// ------------------------------------------------------------------------ INIT
function init() {
    startTime = Date.now();

    clearFolder(() => {
        createDirectory(() => {
            copyTemplate(() => {
                updateFileReferences(() => {
                    end();
                });
            });
        });
    });
}

// HERE
const step1 = {
    title: {
        pattern: /^[a-zA-Z0-9\s-]+$/,
        message: 'Name must be letters, numbers, spaces or dashes.',
        required: true,
    },
    description: {
        required: false,
    },
};

const step2 = {
    template: {
        pattern: /^[0-9\s]+$/,
        message: 'Only numbers are allowed.',
        required: true,
    },
};

console.log('');
console.log(colors.cyan('kickjs'), pkg.version);
console.log(colors.gray('Please enter your project details:'));

prompt.start();
prompt.message = '';
prompt.get({
    properties: step1,
}, (err, result1) => {
    if (!err) {
        title = result1.title;
        description = result1.description;

        console.log('');
        console.log(colors.gray('Please select the template:'));
        console.log(colors.cyan('(1)'), colors.gray('default'), colors.cyan('(2)'), colors.gray('react'), colors.cyan('(3)'), colors.gray('electron/react'));
        prompt.get({ properties: step2 }, (error, result2) => {
            switch (result2.template) {
                case '1':
                    template = 'default';
                    break;
                case '2':
                    template = 'react';
                    break;
                case '2':
                    template = 'electron';
                    break;
                default:
                    console.log(colors.red('invalid template:'), colors.gray('using default template'));
                    template = 'default';

            }
            init();
        });
    }
});
