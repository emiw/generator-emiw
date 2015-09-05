/* (c) 2015 EMIW, LLC. emiw.xyz/license */
var yeoman = require('yeoman-generator');
var validLicense = require('validate-npm-package-license');
var slugify = require("underscore.string/slugify");

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    var people = {
      Ari: {
        name: "Ari Porad",
        email: "ari@emiw.xyz",
        url: "http://ariporad.com"
      },
      Zoe: {
        name: "Zoe Carver",
        email: "zoe@emiw.xyz"
      },
      Henry: {
        name: "Henry Roseman",
        email: "henry@emiw.xyz"
      },
    };

    var peopleNames = Object.keys(people);
    var prompts = [
      {
        'type': 'input',
        'name': 'name',
        'message': 'What do you want to name this module?: '
      },
      {
        type: 'confirm',
        name: 'scope',
        message: 'Should this package be scoped (should it start with @emiw/should it be private)?: '
      },
      {
        type: 'input',
        name: 'desc',
        message: 'What\'s the description for the module?'
      },
      {
        type: 'list',
        name: 'author',
        message: 'Who is the primary author of the module? ',
        choices: peopleNames,
      },
      {
        type: 'checkbox',
        name: 'contributors',
        message: 'Who else will be working on the module? ',
        choices: function(props) {
          var peopleNamesWithoutAuthor = peopleNames.slice();
          peopleNamesWithoutAuthor.splice(peopleNames.indexOf(props.author), 1);

          return peopleNamesWithoutAuthor;
        }
      },
      {
        type: 'input',
        name: 'license',
        message: 'What is the license for the module?: ',
        default: 'UNLICENSED',
        validate: function(res) {
          if (validLicense(res || this.default).validForNewPackages) {
            return true;
          } else {
            return 'Invalid License.'
          }
        }
      }
    ];

    this.prompt(prompts, function(props) {
      console.log(props);
      props.author = people[props.author];
      props.contributors = (props.contributors || []).map(function(c) {
        return people[c];
      });

      props.scope = props.scope ? '@emiw/' : '';

      props.name = props.name.replace(/^@?emiw\/?/i, '');
      props.slug = slugify(props.name);

      this.props = props;

      done();
    }.bind(this));
  },

  contrib: function() {
    function indent(str) {
      str = str || '';
      return str.split('\n').map(function(line) {
        return '  ' + line;
      }).join('\n');
    }

    this.props.contrib = indent(JSON.stringify(this.props.contributors, null, 2));
    this.props.authorStr = indent(JSON.stringify(this.props.author, null, 2));
  },

  writing: {
    copy: function() {
      var files = {
        '_gulpfile.js': 'gulpfile.js',
        'babelrc.json': '.babelrc',
        'cz.json': '.cz.json',
        'eslintrc.json': '.eslintrc',
        'testSetup.js': 'test/setup.js',
        'gitignore': '.gitignore'
      };

      var srcFiles = Object.keys(files);
      for (var i = 0; i < srcFiles.length; i++) {
        this.fs.copy(
          this.templatePath(srcFiles[i]),
          this.destinationPath(files[srcFiles[i]])
        );
      }
    },

    copyTpl: function() {
      var files = {
        '_package.json': 'package.json',
        'readme.md': 'README.md',
      };

      var srcFiles = Object.keys(files);
      for (var i = 0; i < srcFiles.length; i++) {
        this.fs.copyTpl(
          this.templatePath(srcFiles[i]),
          this.destinationPath(files[srcFiles[i]]),
          this.props
        );
      }
    },

    index: function() {
      // this.composeWith("emiw:file", { args: ['src/index', 'js'] });
    },
  },

  install: function() {
    this.installDependencies();
  }
});
