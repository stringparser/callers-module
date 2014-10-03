'use strict';

var should = require('should');
var callerModule = require('../.');

var caller;

module.exports = function(){

  it('should be => "mocha/lib"', function origin(){
    caller = callerModule(origin);
    should(caller.scope).be.equal('mocha/lib');
  });
};
