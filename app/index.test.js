/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/*global rewire:false, expect:false, sinon:false*/
/*eslint-env mocha */

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

function runGenerator(prompts) {
  return function run(done) {
    helpers.run(path.join(__dirname, '/index.js'))
      .withPrompts(prompts || {})
      .withOptions({ skipInstall: true, force: true })
      .on('end', done);
  };
}


describe('@emiw/module', function mainDescribe() {
  describe('basics', function basics() {
    before(runGenerator({ name: 'someFeature', extension: 'js' }));

    it('creates files', function createsFiles() {
      assert.file([
        'someFeature.js',
        'someFeature.test.js',
      ]);
    });

    //{ name: 'something',
    //  scope: true,
    //  desc: 'cool',
    //  author: 'Ari',
    //  contributors: [ 'Zoe' ],
    //  license: 'UNLICENSED' }

    it('the test requires the file', function testRequires() {
      assert.fileContent('someFeature.test.js', /re(?:w|qu)ire\(\'\.\/someFeature\'\)/);
    });
  });

  describe('custom extension', function customExtension() {
    before(runGenerator([], { name: 'someFeature', extension: 'jsx' }));
    it('should create the file with the custom extension', function usesCustomExtension() {
      assert.file([
        'someFeature.jsx',
        'someFeature.test.jsx',
      ]);
    });
  });
});
