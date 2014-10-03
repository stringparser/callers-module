'use strict';

var should = require('should');
var callerModule = require('../.');

var caller;

module.exports = function (){

  it('should be "mocha"', function origin(){
    caller = callerModule(origin);
    should(caller.module).be.equal('mocha');
  });
};
