'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('cleanAfterYourself', function (callback) {
    return del([
        'build/js/app.js',
        'build/js/vendors.js',
        'build/vendors',
        'build/css/main.css'
    ], { force: true }, callback);
});

gulp.task('minify-css', function() {
    return gulp.src('./build/css/main.css')
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('production', function(callback) {
    gulpSequence('clear', 'copy', ['styles', 'pages'], 'scripts', 'vendors', 'compress', 'minify-css', 'cleanAfterYourself', callback);
});
