var yeoman = require('yeoman-generator');
var banners = require('../../banners');

module.exports = yeoman.generators.Base.extend({
  initializing: function generateConfig() {
    this.config.defaults({
      banners: banners.getDefaultConfig(),
      basedir: 'src'
    });
  },
});
