'use strict';

var path = require('path');
var callsites = require('v8-callsites');

var wd = process.cwd();

function callersModule(frames, origin){

  var stack = callsites(frames, origin || callersModule);
  var frame = stack[stack.length-1];

  var filename = frame.getFileName();
  var line = frame.getLineNumber();
  var column = frame.getColumnNumber();

  var location = filename + ':' + line + ':' + column;

  var ext = path.extname(filename);
  var base = path.basename(filename, ext);

  var moduleName, scopeName;
  if( filename.replace(ext, '') === base ){
     // ^ path === 'file.js' || path === 'moduleName'
     //   can only be so for node core or V8 modules
     moduleName = base;
      scopeName = frame.isNative() ? 'V8' : 'node';
  }

  var dir = filename.split(path.sep);
  var index = dir.indexOf('node_modules');
  if( index < 0 ){
    // is your code

    moduleName = path.relative(
      path.resolve(wd, '..'), wd
    );

    scopeName = path.relative(
      wd, path.dirname(filename)
    ) || './.';

    return {
       module : moduleName,
        scope : scopeName,
         path : filename,
     location : location
    };
  }
  // its in `node_modules`
  moduleName = dir[index+1];
  scopeName = dir;

  while( index > -1 ){
    scopeName = scopeName.slice(index+1);
    index = scopeName.indexOf('node_modules');
  }

  scopeName = dir.slice(
    dir.indexOf('node_modules') + 1, index
  ).join(path.sep);

  return {
     module : moduleName,
      scope : scopeName,
       path : filename,
   location : location
  };
}

module.exports = callersModule;
