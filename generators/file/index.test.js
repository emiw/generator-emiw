/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/*global rewire:false, expect:false, sinon:false*/
/*eslint-env mocha */

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

function runGenerator(args, prompts) {
  var cleanArgs = args || [];
  var cleanPrompts = prompts || {};
  if (!(cleanArgs instanceof Array || typeof cleanArgs === 'string')) {
    cleanPrompts = cleanArgs;
    cleanArgs = [];
  }
  return function run(done) {
    helpers.run(path.join(__dirname, '/index.js'))
      .withArguments(cleanArgs)
      .withPrompts(cleanPrompts)
      .withOptions({ skipInstall: true, force: true })
      .on('end', done);
  };
}

describe('Emiw:generators/file', function mainDescribe() {
  describe('with args', function withArgs() {
    describe('basics', function basics() {
      before(runGenerator('someFeature'));

      it('creates files', function createsFiles() {
        assert.file([
          'src/someFeature.js',
          'src/someFeature.test.js',
        ]);
      });

      it('the test requires the file', function testRequires() {
        assert.fileContent('src/someFeature.test.js', /re(?:w|qu)ire\(\'\.\/someFeature\'\)/);
      });
    });

    describe('custom extension', function customExtension() {
      before(runGenerator(['someFeature', 'jsx']));
      it('should create the file with the custom extension', function usesCustomExtension() {
        assert.file([
          'src/someFeature.jsx',
          'src/someFeature.test.jsx',
        ]);
      });
    });
  });

  describe('with prompts', function withPrompts() {
    describe('basics', function basics() {
      before(runGenerator([], { name: 'someFeature', extension: 'js' }));

      it('creates files', function createsFiles() {
        assert.file([
          'src/someFeature.js',
          'src/someFeature.test.js',
        ]);
      });

      it('the test requires the file', function testRequires() {
        assert.fileContent('src/someFeature.test.js', /re(?:w|qu)ire\('\.\/someFeature'\)/);
      });
    });

    describe('custom extension', function customExtension() {
      before(runGenerator([], { name: 'someFeature', extension: 'jsx' }));
      it('should create the file with the custom extension', function usesCustomExtension() {
        assert.file([
          'src/someFeature.jsx',
          'src/someFeature.test.jsx',
        ]);
      });
    });
  });
});
