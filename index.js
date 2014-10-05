'use strict';

var path = require('path');
var callsites = require('v8-callsites');

var wd = process.cwd();

function callersModule(frames, origin){

  var stack = callsites(frames, origin || callersModule);
  var frame = stack[stack.length-1];

  var file = frame.getFileName();
  var line = frame.getLineNumber();
  var column = frame.getColumnNumber();

  var ext = path.extname(file);
  var base = path.basename(file, ext);

  var moduleName, scopeName;
  if( file.replace(ext, '') === base ){
    // possible if node core or V8 module

     moduleName = base;
      scopeName = frame.isNative() ? 'V8' : 'node';

    return {
       module : moduleName,
        scope : scopeName,
         path : file,
     location : file + ':' + line + ':' + column
    };
  }

  var dir = file.split(path.sep);
  var index = dir.indexOf('node_modules');
  if( index < 0 ){ // is your code

    moduleName = path.relative( path.resolve(wd, '..'), wd);
     scopeName = path.relative( wd, path.dirname(file)) || './.';

    return {
       module : moduleName,
        scope : scopeName,
         path : file,
     location : file + ':' + line + ':' + column
    };
  } // then its in `node_modules`

  moduleName = dir[index+1];
  scopeName = dir;

  while( index > -1 ){
    scopeName = scopeName.slice(index+1);
    index = scopeName.indexOf('node_modules');
  }

  scopeName = dir.slice( dir.indexOf('node_modules') + 1, index).join(path.sep);

  return {
     module : moduleName,
      scope : scopeName,
       path : file,
   location : file + ':' + line + ':' + column
  };
}

module.exports = callersModule;
