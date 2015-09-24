var gulp       = require('gulp');
var sass       = require('gulp-sass');
var livereload = require('gulp-livereload');

gulp.task('style', function () {
  gulp.src('src/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
    .pipe(livereload());
});