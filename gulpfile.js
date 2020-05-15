var { src, dest, parallel } = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

function js() {
  return src('src/*.js')
    .pipe(dest('dist'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist'))
}

exports.default = parallel(js);