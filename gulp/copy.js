var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('copy', function(){
  // copy images to dist and build
  gulp.src('src/img/**')
    .pipe(gulp.dest('public/img'))

  // gulp.src('src/img/**')
  //   .pipe(imagemin({
  //       progressive: true,
  //       svgoPlugins: [{removeViewBox: false}],
  //       use: [pngquant()]
  //   }))
  //   .pipe(gulp.dest('public/img'));

  // copy fonts to dist and build
  gulp.src('src/fonts/**')
    .pipe(gulp.dest('public/fonts'))
});