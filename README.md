<div align="center"><img src="misc/polog.png"/></div>

[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/pkoretic/polog/blob/master/LICENSE)<br/>
[![NPM](https://nodei.co/npm/polog.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/polog)

`polog` is one of the fastest and simplest Node.js logging library that behaves as the standard
`console` command. It adds some sugar as timestamp and log levels. This library uses as
little processing power as possible to avoid affecting Node.js event loop.

Logging (in Node.js) should always use stdout/stderr and leave advanced logging manipulation to the
rest of the stack. For best performance and asynchronous operation you should use pipes on Linux as
mentioned in [official docs](https://nodejs.org/api/process.html#process_a_note_on_process_i_o).
This also enables you to do file logging as efficiently as possible.

`console` uses process.stdout.write which has the same behaviour as this library.

### Installation

```
npm install polog
```

### Standard logging

```
const enable_debug = true
const log = require('polog')(enable_debug)

log.debug("debug mode") // shown only when debug is set to true above
log.info("hello there!")
log.warn("be careful")
log.error("not god")
```

this results in

```
2017-05-03T20:28:05.089Z D debug mode
2017-05-03T20:28:05.090Z I hello there!
2017-05-03T20:28:05.090Z W be careful
2017-05-03T20:28:05.090Z E not god
```

### Fast file logging on Linux

Redirect (pipe) all logs to a file [asynchronously](https://nodejs.org/api/process.html#process_a_note_on_process_i_o)

```
node app.js > app.log 2>&1
```

Split standard and error logs

```
node app.js > access.log 2>error.log
```

### Formatting

Formatting options are the same as for the `console` functions, processed by
[util.format](https://nodejs.org/api/util.html#util_util_format_format_args).

```
const x = Math.random()
log.info("hello %d", x)
```

Keep in mind that, in certain cases, it is faster to use ES6 template strings if possible, ie:

```
const x = Math.random()
log.info("hello ${x}")
```
