<%- banners.file %>

module.exports = require('load-deps')('gulp-*', {
  renameKey: name => name.replace(/^gulp-/, ''),
});
