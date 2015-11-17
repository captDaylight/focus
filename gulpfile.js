'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir')('./gulp');

gulp.task('default', 
	[
		'image', 			// copy images and fonts to the public folder
		'style', 
		'javascript',
		'watch',
	]);

// gulp.task('build', 
// 	[
// 		'copy', 			// copy images and fonts to the public folder
// 		'style', 
// 		'browserify', 
// 	]);