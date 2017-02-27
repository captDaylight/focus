var gulp = require('gulp');
var livereload = require('gulp-livereload');

// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/js/**/*.js', ['javascript']);
  gulp.watch('src/scss/**/*.scss', ['style']);
});