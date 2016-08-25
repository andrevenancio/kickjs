'use strict';

var gulp = require('gulp');
var del = require('del');

gulp.task('clear', function (callback) {
    return del([
        '.tmp',
        'build'
    ], { force: true }, callback);
});
