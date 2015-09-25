/* (c) 2015 EMIW, LLC. emiw.xyz/license */

function getDefaultConfig() {
  return {
    test: ['global expect:false, assert:false', 'eslint-env mocha'],
    file: [],
    all: ['(c) 2015 EMIW, LLC. emiw.xyz/license'],
  };
}

function clean(comment) {
  return comment.trim().replace(/^\/\*/, '').replace(/\*\/$/, '').trim();
}

function generateBanners(config) {
  var fileBanners = config.all.concat(config.file);
  var fileBannerStr = '';
  for (var i = 0; i < fileBanners.length; i++) {
    fileBannerStr += `/* ${clean(fileBanners[i])} */\n`;
  }

  const testBanners = config.all.concat(config.test);
  var testBannerStr = '';
  for (var i = 0; i < testBanners.length; i++) {
    testBannerStr += `/* ${clean(testBanners[i])} */\n`;
  }

  return {
    // We have to remove the final newline
    file: fileBannerStr.slice(0, -1),
    test: testBannerStr.slice(0, -1),
  };
}

module.exports = generateBanners;
module.exports.getDefaultConfig = getDefaultConfig;