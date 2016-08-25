'use strict';

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var customConfig = require('../../config');

gulp.task('pages', function () {

    var templateData = {
        isProduction: config.isProduction,
        title: customConfig.title,
        description: customConfig.description,
        ga: customConfig.ga,
    };
    var options = {
        batch : [config.pages.partials]
    };

    return gulp.src([config.pages.src])
        .pipe( handlebars(templateData, options) )
        .pipe( rename('index.html') )
        .pipe( gulp.dest(config.build) )
        .pipe( config.isProduction ? gutil.noop() : browserSync.reload({ stream: true }) );
});
