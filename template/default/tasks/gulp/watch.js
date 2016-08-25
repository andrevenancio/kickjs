'use strict';

var config = require('../config');
var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('watch', function () {
    gulp.watch(config.styles.watch, ['styles']);
    gulp.watch(config.pages.watch , ['pages']);
    // for performance scripts watch is done in gulp/scripts.js
});
