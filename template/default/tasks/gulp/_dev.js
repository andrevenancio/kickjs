'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('dev', function(callback) {
    gulpSequence('clear', 'copy', ['styles', 'pages'], 'scripts', 'vendors', 'server', 'watch', callback);
});
