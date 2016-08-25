'use strict';

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

gulp.task('styles', function() {

    return gulp.src(config.styles.src)
        .pipe( sass().on('error', sass.logError) )
        .pipe( autoprefixer(['> 1%', 'last 2 versions']) )
        .pipe( gulp.dest(config.styles.dest) )
        .pipe( config.isProduction ? gutil.noop() : browserSync.reload( { stream: true } ) );

});
