'use strict';

var config = require('../config');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var fs = require('fs');
var path = require('path');
var url = require('url');
gulp.task('server', function() {
    // The default file if the file/path is not found
    var defaultFile = '/index.html';

    // The folder where we expect to find files.
    var folder = path.resolve(__dirname, '../../', config.buildBase);

    browserSync({
        ghostMode: false,
        server: {
            baseDir: config.buildBase,
            middleware: function(req, res, next) {
                var fileName = url.parse(req.url);
                fileName = fileName.href.split(fileName.search).join('');
                var fileExists = fs.existsSync(folder + fileName);
                if (!fileExists && fileName.indexOf('browser-sync-client') < 0) {
                    req.url = '/' + defaultFile;
                }
                return next();
            }
        }
    });
});
