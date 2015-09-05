/* (c) 2015 EMIW, LLC. emiw.xyz/license */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');

var SRC_OTHER = ['src/**', '!**/*.js'];
var SRC_JS = ['src/**/*.js'];
var DEST = './dist';

var TESTS = ['test/setup.js', 'src/**/*.test.js'];

function negate(paths) {
  return paths.map(function mapNegate(p) {
    return '!' + p;
  });
}

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

gulp.task('copy:other', function copy() {
  return gulp.src(SRC_OTHER)
    .pipe(gulp.dest(DEST));
});

gulp.task('lint', function lint() {
  return gulp.src(SRC_JS)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
});

gulp.task('test', ['lint'], function test(cb) {
  // Allow ES6 tests
  require('babel/register');
  require('source-map-support').install();
  gulp.src(SRC_JS.concat(negate(TESTS)))
    .pipe(plugins.istanbul()) // Covering files
    .pipe(plugins.istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function() {
          gulp.src(TESTS)
            .pipe(plugins.mocha())
            .pipe(plugins.istanbul.writeReports()) // Creating the reports after tests ran
            .pipe(plugins.istanbul.enforceThresholds({ thresholds: { global: 90 } })) // Min 90% CC
            .on('end', function uploadCoverage(err) {
                  if (err) return cb(err);
                  gulp.src('coverage/**/lcov.info')
                    .pipe(plugins.coveralls())
                    .on('end', cb);
                });
        });
});

gult.task('coverage:upload', function coverageUpload() {
  return
});

gulp.task('watch', ['build'], function watch() {
  gulp.watch(SRC_JS, ['test', 'build']);
});

gulp.task('clean', function clean(cb) {
  del([DEST], cb);
});
