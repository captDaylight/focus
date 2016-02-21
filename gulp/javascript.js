// const gulp = require('gulp');
// const webpack = require('webpack-stream');
// const named = require('vinyl-named');
// var path = require('path');

// gulp.task('javascript', function() {
//   return gulp.src([
//   		'babel-polyfill',
//   		'src/js/background.js', 
//   		'src/js/popup.js',
//   		'src/js/content.js',
//   		'src/js/newtab.js'
//   	])
//     .pipe(named())
//     .pipe(webpack({
//       watch: true,
//       module: {
//         loaders: [{
//           loader: 'babel-loader',
//           test: /\.js$/,
//           include: [
//             path.resolve(__dirname, 'src'),
//           ],
//           query: {
//             plugins: ['transform-runtime'],
//             presets: ['es2015', 'stage-0', 'react'],
//           }
//         }]
//       }      
//     }))
//     .pipe(gulp.dest('dist/js/'));
// });