'use strict';

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

function buildScript(file) {
    var bundler = browserify({
            entries: [file],
            cache: {},
            packageCache: {}
        }, watchify.args)
        .transform("babelify", {presets: ["es2015"]});

    if (!config.isProduction) {
        bundler = watchify(bundler);
        bundler.on('update', function() {
            gutil.log('bundle update');
            rebundle();
        });
    }

    function rebundle() {
        return bundler.bundle()
            .on('error', function(err) {
                gutil.log('Browserify Error', err.stack);
            })
            .pipe( source('app.js') )
            .pipe( buffer() )
            .pipe( gulp.dest(config.scripts.dest) )
            .pipe( config.isProduction ? gutil.noop() : browserSync.reload( { stream: true } ) );
    }

    return rebundle();
}

gulp.task('scripts', function() {
    return buildScript(config.scripts.src);
});
