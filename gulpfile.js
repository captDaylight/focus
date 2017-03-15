'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir')('./gulp');
var webpack = require('webpack');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
var path = require('path');
const plumber = require('gulp-plumber');

gulp.task('javascript', function() {
  return gulp.src([
      'babel-polyfill',
      'src/js/background.js',
      'src/js/popup.js',
      'src/js/content.js',
      'src/js/newtab.js'
    ])
    .pipe(plumber())
    .pipe(named())
    .pipe(webpackStream({
      watch: true,
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('development'),
            'API_URL': JSON.stringify('http://localhost:3000/'),
          }
        }),
      ],
      module: {
        loaders: [{
          loader: 'babel-loader',
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'src'),
          ],
          query: {
            plugins: ['transform-runtime'],
            presets: ['es2015', 'stage-0', 'react'],
          }
        }]
      }
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('javascriptProd', function() {
  return gulp.src([
      'babel-polyfill',
      'src/js/background.js',
      'src/js/popup.js',
      'src/js/content.js',
      'src/js/newtab.js'
    ])
    .pipe(plumber())
    .pipe(named())
    .pipe(webpackStream({
      watch: false,
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production'),
            'API_URL': JSON.stringify('https://focus-server.herokuapp.com/'),
          }
        })
      ],
      module: {
        loaders: [{
          loader: 'babel-loader',
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'src'),
          ],
          query: {
            plugins: ['transform-runtime'],
            presets: ['es2015', 'stage-0', 'react'],
          }
        }]
      }
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default',
  [
    'image',       // copy images and fonts to the public folder
    'style',
    'javascript',
    'watch',
  ]);

gulp.task('build',
  [
    'image',
    'style',
    'javascriptProd',
  ]);
