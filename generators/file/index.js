/*(c) 2015 EMIW, LLC. emiw.xyz/license*/
var yeoman = require('yeoman-generator');
var path = require('path');
var banners = require('../../banners');

module.exports = yeoman.generators.Base.extend({
  constructor: function constructor() {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('name', {
      required: false,
      optional: true,
      type: String,
      desc: 'The name of the file',
      default: 'js',
    });

    this.argument('extension', {
      required: false,
      optional: true,
      type: String,
      desc: 'The extension for the files',
      default: 'js',
    });
  },

  prompting: function prompting() {
    var done = this.async();
    if (!this.name) {
      this.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the file (w/o the extension)?:',
        },
        {
          type: 'input',
          name: 'extension',
          default: 'js',
          message: 'What extension would you like for the files?:',
        },
      ], function prompted(props) {
        this.name = props.name;
        this.extension = props.extension;
        done();
      }.bind(this));
    } else {
      done();
    }
  },

  cleanExtension: function cleanExtension() {
    // sanitize
    this.extension = this.extension || 'js';
    this.extension = this.extension.replace(/^(\.)/i, '');
    this.extension = '.' + this.extension;
  },

  generateFilename: function generateFilename() {
    var filenameRegex = new RegExp('((?:\.test)?\.' + this.extension + ')$', 'i');
    this.filename = this.name.replace(filenameRegex, '');
  },

  defaultConfig: function defaultConfig() {
    this.composeWith('emiw:yo-rc');
  },

  banners: function setupBanners() {
    this.banners = banners(this.config.get('banners'));
  },

  copy: function copy() {
    var i;
    var files = {
      'file.js': path.resolve(this.config.get('basedir'), this.filename + this.extension),
      'file.test.js': path.resolve(this.config.get('basedir'), this.filename + '.test' + this.extension),
    };

    var srcFiles = Object.keys(files);
    for (i = 0; i < srcFiles.length; i++) {
      this.fs.copyTpl(
        this.templatePath(srcFiles[i]),
        this.destinationPath(files[srcFiles[i]]),
        {
          filename: path.basename(this.filename, this.extension),
          config: this.config.getAll(),
          banners: this.banners,
        }
      );
    }
  },
});
