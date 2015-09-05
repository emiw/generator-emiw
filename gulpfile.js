/* (c) 2015 EMIW, LLC. emiw.xyz/license */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var SRC_JS = ['src/**/*.js'];
var TESTS = 'src/**/*.test.js';

gulp.task('lint', function() {
  return gulp.src(SRC_JS)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

gulp.task('test', ['lint', 'mocha']);
gulp.task('mocha', function() {
  // Allow ES6 tests
  require('babel/register');
  require('source-map-support').install();
  return gulp.src(TESTS)
    .pipe(plugins.mocha());
});

gulp.task('watch', function() {
  gulp.watch(SRC_JS, ['test']);
});
