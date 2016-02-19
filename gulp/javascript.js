var gulp       = require('gulp');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var babel      = require('babelify');
var uglify     = require('gulp-uglify');
var buffer     = require('vinyl-buffer');
var transform  = require('vinyl-transform');
var browserify = require('browserify');
var envify     = require('envify/custom');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var argv = require('yargs').argv; // take values from command line

gulp.task('javascript', function () {
	// set up the browserify instance on a task basis
	var b = browserify({
		entries: `./src/js/${argv.jsfile}.js`,
		debug: true,
		// defining transforms here will avoid crashing your stream
		transform: [[babel, { "stage": "2" }],reactify]
	});

	return b.bundle()
		.pipe(source(`${argv.jsfile}.js`))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			// Add transformation tasks to the pipeline here.
			// .pipe(uglify())
			.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/js/'));

});