# callers-module [<img alt="progressed.io" src="http://progressed.io/bar/99" align="right"/>](https://github.com/fehmicansaglam/progressed.io)

[<img alt="build" src="http://img.shields.io/travis/stringparser/callers-module/master.svg?style=flat-square" align="left"/>](https://travis-ci.org/stringparser/callers-module/builds)
[<img alt="NPM version" src="http://img.shields.io/npm/v/callers-module.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/callers-module)
<br>

[V8 stacktrace API](https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi) based caller's path

## install

    npm install --save callers-module

## usage

```js
var path = require('path');
var callersModule = require('callers-module');

// mocha test/fileName.js
module.exports = function(){
  console.log(callersModule());
  // => {
  //    module : 'mocha',
  //     scope : 'mocha/lib',
  //  filename : 'node_modules/mocha/lib/runnable.js',
  //  location : 'node_modules/mocha/lib/runnable.js:249:21'
  // };
}
```

### documentation

`require('callers-module')([frames, origin])`

 - `frames` if specified should be an `integer` bigger than `0` or `Infinity`.
 - `origin` if specified should be a function.
 - if no arguments, the default number of `frames` is `2` so the `origin` is the module itself. The returned stack is sliced by one.

See also the [avaliable methods](https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi) of the stack trace api like:
 - `getLineNumber`
 - `getFileName`
 - `getEvalOrigin`
 - etc.

## why

You would like to set how many frames are recorded (`Error.stackTraceLimit`) and from which function the stack should be traced back (`Error.captureStackTrace`).

By default two frames are recorded, though you can even lower it to one providing a function from which start.

### inspirated by

It serves for the same use cases implemented on this cool modules

 - [visionmedia `callsite`](https://github.com/visionmedia/callsite)
 - [sindresorhus `callsites`](https://github.com/sindresorhus/callsites)
 - [sindresorhus `caller-path`](https://github.com/sindresorhus/caller-path)

## test

    npm test

### license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/callers-module.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)
