var gulp       = require('gulp');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var babel      = require('babelify');
var uglify     = require('gulp-uglify');
var buffer     = require('vinyl-buffer');
var browserify = require('browserify');
var envify     = require('envify/custom');
var livereload = require('gulp-livereload');


// Default to development services
// DEV
var s3MarkerBucketUrl = '//paste-marker-raw-dev.s3.amazonaws.com/';
// var apiHostName = '//marx-development.herokuapp.com';
var apiHostName = '//marx-staging.herokuapp.com';
var s3ProfileBucketUrl = '//paste-avatars-dev.s3.amazonaws.com/';

// PRODUCTION
// var s3MarkerBucketUrl = 'http://paste-marker-raw.s3.amazonaws.com/';
// var apiHostName = 'https://marx-production.herokuapp.com';
// var s3ProfileBucketUrl = '//paste-avatars.s3.amazonaws.com/';

// URLs for production services
if (process.env.NODE_ENV === 'production') {
  s3MarkerBucketUrl = '//paste-marker-raw.s3.amazonaws.com/'
  apiHostName = '//marx-production.makemarx.com';
  s3ProfileBucketUrl = '//paste-avatars.s3.amazonaws.com/';
// URLs for staging services
} else if (process.env.NODE_ENV === 'debugging') {
  apiHostName = 'https://marx-development.herokuapp.com';
}

gulp.task('browserify', function () {
  browserify('src/js/index.js')
    .transform(babel)
    .transform(reactify)
    .transform(
      {global: true},
      envify({
        NODE_ENV : process.env.NODE_ENV,
        API_HOSTNAME : apiHostName,
        API_S3_MARKER_BUCKET_URL : s3MarkerBucketUrl,
        API_S3_PROFILE_BUCKET_URL : s3ProfileBucketUrl
      })
    )
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('public/js'))
    .pipe(livereload())
});