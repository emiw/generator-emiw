var yeoman = require('yeoman-generator');
var banners = require('../../banners.js');

module.exports = yeoman.generators.Base.extend({
  initializing: function generateConfig() {
    this.config.defaults({
      banners: banners.getDefaultConfig(),
      basedir: 'src'
    });
  },
});
