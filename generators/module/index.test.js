/* (c) 2015 EMIW, LLC. emiw.xyz/license */
/*global rewire:false, expect:false, sinon:false*/
/*eslint-env mocha */

var path = require('path');
var fs = require('fs');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var expect = require('chai').expect;

function runGenerator(prompts) {
  return function run(done) {
    helpers.run(path.join(__dirname, '/index.js'))
      .withPrompts(prompts || {})
      .withOptions({ skipInstall: true, force: true })
      .withGenerators([[helpers.createDummyGenerator(), '@emiw/file']])
      .on('end', done);
  };
}


describe('@emiw/module', function mainDescribe() {
  /*
   * Prompt Shape:
   *  {
   *    name: 'something',
   *    scope: true,
   *    desc: 'cool',
   *    author: 'Ari',
   *    contributors: [ 'Zoe' ],
   *    license: 'UNLICENSED'
   *  }
   */
  describe('basics', function basics() {
    before(runGenerator({
      name: 'foo',
      scope: true,
      desc: 'bar baz qux',
      author: 'Ari',
      contributors: ['Zoe'],
      license: 'UNLICENSED',
    }));

    it('creates files', function createsFiles() {
      assert.file([
        'gulpfile.js',
        'package.json',
        '.babelrc',
        '.cz.json',
        '.eslintrc',
        '.gitignore',
        'README.md',
        'test/setup.js',
      ]);
    });

    ['package.json', '.babelrc', '.cz.json', '.eslintrc'].forEach(function createJSONTest(file) {
      it(file + ' should be valid JSON.', function testJSONFile() {
        var content = fs.readFileSync(file, 'utf8');
        expect(JSON.parse.bind(JSON, content)).to.not.throw();
        expect(JSON.parse(content)).to.be.an.instanceOf(Object);
      });
    });

    describe('package.json', function pkgJSON() {
      var pkg;
      before(function beforePkg() {
        pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      });

      it('author', function author() {
        assert.equal(pkg.author.name, 'Ari Porad', 'author.name');
        assert.equal(pkg.author.email, 'ari@emiw.xyz', 'author.email');
      });

      it('contributors', function contribs() {
        assert.equal(pkg.contributors.length, 1, 'Only 1 contributor');
        assert.equal(pkg.contributors[0].name, 'Zoe Carver', 'first contributor\'s name');
        assert.equal(pkg.contributors[0].email, 'zoe@emiw.xyz', 'first contributor\'s email');
      });

      it('name', function name() {
        assert.equal(pkg.name, '@emiw/foo', 'package.name');
      });

      it('description', function desc() {
        assert.equal(pkg.description, 'bar baz qux', 'desc');
      });

      it('license', function license() {
        assert.equal(pkg.license, 'UNLICENSED', 'license');
      });
    });
  });

  describe('alternative options', function alts() {
    before(runGenerator({
      name: 'barbaz',
      scope: false,
      desc: 'quux quux quux quux',
      author: 'Henry',
      contributors: [],
      license: 'MIT',
    }));

    describe('package.json', function pkgJSON() {
      var pkg;
      before(function beforePkg() {
        pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      });

      it('author', function author() {
        assert.equal(pkg.author.name, 'Henry Roseman', 'author.name');
        assert.equal(pkg.author.email, 'henry@emiw.xyz', 'author.email');
      });

      it('contributors', function contribs() {
        assert.equal(pkg.contributors.length, 0, 'No contributors');
      });

      it('name', function name() {
        assert.equal(pkg.name, 'barbaz', 'package.name');
      });

      it('description', function desc() {
        assert.equal(pkg.description, 'quux quux quux quux', 'desc');
      });

      it('license', function license() {
        assert.equal(pkg.license, 'MIT', 'license');
      });
    });
  });
});
