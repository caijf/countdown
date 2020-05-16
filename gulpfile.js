var { src, dest, parallel } = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

function dist() {
  return src('src/*.js')
    .pipe(dest('dist'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist'))
}

function lib() {
  return src('src/*.js')
    .pipe(uglify())
    .pipe(dest('lib'))
}

exports.default = parallel(lib, dist);