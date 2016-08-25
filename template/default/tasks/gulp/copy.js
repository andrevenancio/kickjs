'use strict';

var config = require('../config');
var gulp = require('gulp');

gulp.task('copy', function() {
    gulp.src(config.static.src + '/**/')
        .pipe(gulp.dest(config.static.dest));
});
