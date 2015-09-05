/* (c) 2015 EMIW, LLC. emiw.xyz/license */

global.expect = require('chai').expect;

var sandbox = require('sinon').sandbox;

beforeEach(function() {
  global.sinon = sandbox.create();
});

afterEach(function() {
  global.sinon.restore();
  delete global.sinon;
});


