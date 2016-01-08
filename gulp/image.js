var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('image', function(){
  gulp.src('src/img/**')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/img'));
  gulp.src('src/sound/**')
    .pipe(gulp.dest('dist/sound'));
});