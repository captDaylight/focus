var gulp       = require('gulp');
var sass       = require('gulp-sass');
var livereload = require('gulp-livereload');
var csso = require('gulp-csso');

gulp.task('style', function () {
  gulp.src('./src/scss/main.scss')
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
});