'use strict';

var config = require('../config');
var gulp = require('gulp');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var customConfig = require('../../config.json');

gulp.task('vendors', function() {

    var l = customConfig.vendors.map(v => config.build + '/vendors/' + v);

    return gulp.src(l)
        .pipe( concat('vendors.js') )
        .pipe( gulp.dest( config.build + '/js/' ) );
});
