/* (c) 2015 EMIW, LLC. emiw.xyz/license */
var yeoman = require('yeoman-generator');
var validLicense = require('validate-npm-package-license');
var slugify = require('underscore.string/slugify');
var banners = require('../../banners');

module.exports = yeoman.generators.Base.extend({
  prompting: function prompting() {
    var done = this.async();

    var people = {
      Ari: {
        name: 'Ari Porad',
        email: 'ari@emiw.xyz',
        url: 'http://ariporad.com',
      },
      Zoe: {
        name: 'Zoe Carver',
        email: 'zoe@emiw.xyz',
      },
      Henry: {
        name: 'Henry Roseman',
        email: 'henry@emiw.xyz',
      },
    };

    var peopleNames = Object.keys(people);
    var prompts = [
      {
        'type': 'input',
        'name': 'name',
        'message': 'What do you want to name this module?:',
      },
      {
        type: 'confirm',
        name: 'scope',
        message: 'Should this package be scoped (should it start with @emiw/should it be private)?:',
      },
      {
        type: 'input',
        name: 'desc',
        message: 'What\'s the description for the module?',
      },
      {
        type: 'list',
        name: 'author',
        message: 'Who is the primary author of the module?',
        choices: peopleNames,
      },
      {
        type: 'checkbox',
        name: 'contributors',
        message: 'Who else will be working on the module? ',
        choices: function contributorsChoices(props) {
          var peopleNamesWithoutAuthor = peopleNames.slice();
          peopleNamesWithoutAuthor.splice(peopleNames.indexOf(props.author), 1);

          return peopleNamesWithoutAuthor;
        },
      },
      {
        type: 'input',
        name: 'license',
        message: 'What is the license for the module?: ',
        default: 'UNLICENSED',
        validate: function validateLicense(res) {
          return validLicense(res || this.default).validForNewPackages || 'Invalid License.';
        },
      },
    ];

    this.prompt(prompts, function parsePrompts(props) {
      props.author = people[props.author];
      props.contributors = (props.contributors || []).map(function contribNamesToObjs(c) {
        return people[c];
      });

      props.scope = props.scope ? '@emiw/' : '';

      props.name = props.name.replace(/^@?emiw\/?/i, '');
      props.slug = slugify(props.name);

      this.props = props;

      done();
    }.bind(this));
  },

  contrib: function contrib() {
    function indent(str) {
      if (!str) return '';
      return str.split('\n').map(function mapIndentLines(line) {
        return '  ' + line;
      }).join('\n');
    }

    this.props.contrib = indent(JSON.stringify(this.props.contributors, null, 2));
    this.props.authorStr = indent(JSON.stringify(this.props.author, null, 2));
  },

  configDefault: function config() {
    this.config.defaults({
      banners: banners.getDefaultConfig(),
      basedir: 'src'
    });
  },

  banners: function setupBanners() {
    this.props.banners = banners(this.config.get('banners'));
  },

  writing: {
    copy: function copy() {
      var i;
      var files = {
        '_gulpfile.js': 'gulpfile.js',
        'babelrc.json': '.babelrc',
        'cz.json': '.cz.json',
        'eslintrc.json': '.eslintrc',
        'testSetup.js': 'test/setup.js',
        'gitignore': '.gitignore',
        '_TODO.txt': 'TODO.txt',
        '_package.json': 'package.json',
        'readme.md': 'README.md',
      };

      var srcFiles = Object.keys(files);
      for (i = 0; i < srcFiles.length; i++) {
        this.fs.copyTpl(
          this.templatePath(srcFiles[i]),
          this.destinationPath(files[srcFiles[i]]),
          this.props
        );
      }
    },

    index: function index() {
      this.composeWith('emiw:file', { args: ['index', 'js'] });
    },
  },

  install: function install() {
    this.installDependencies();
  },
});
