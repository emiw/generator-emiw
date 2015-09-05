/* (c) 2015 EMIW, LLC. emiw.xyz/license */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');

var SRC_OTHER = ['src/**', '!**/*.js'];
var SRC_JS = ['src/**/*.js'];
var DEST = './dist';

var TESTS = 'src/**/*.test.js';

gulp.task('default', ['build']);
gulp.task('build', ['build:js', 'copy:other']);
gulp.task('build:js', function buildJs() {
  return gulp.src(SRC_JS)
    .pipe(plugins.changed(DEST))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(DEST));
});

gulp.task('copy:other', function copy(){
  return gulp.src(SRC_OTHER)
    .pipe(gulp.dest(DEST));
});

gulp.task('lint', function lint() {
  return gulp.src(SRC_JS)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

gulp.task('test', ['lint'], function test() {
  // Allow ES6 tests
  require('babel/register');
  require('source-map-support').install();
  return gulp.src(TESTS)
    .pipe(plugins.mocha());
});

gulp.task('watch', ['build'], function watch() {
  gulp.watch(SRC_JS, ['test', 'build']);
});

gulp.task('clean', function clean(cb) {
  del([DEST], cb);
});
