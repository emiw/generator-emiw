<%- banners.test %>
var chai = require('chai');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

chai.should();
global.expect = chai.expect;
global.assert = chai.assert;

require('sinomocha')();

