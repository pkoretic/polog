<div align="center"><img src="https://github.com/pkoretic/polog/blob/misc/polog.png?raw=true"/></div>

[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/pkoretic/polog/blob/master/LICENSE)<br/>
[![NPM](https://nodei.co/npm/polog.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/polog)

`polog` is one of the [fastest](benchmarks) and simplest Node.js logging library that behaves as the
standard `console` command. It has no dependencies and adds minor features as timestamp, log levels
and json as opt-in. This library uses as little processing power as possible to avoid affecting
Node.js event loop.

Logging (in Node.js) should always use stdout/stderr and leave advanced logging manipulation to the
rest of the stack. For best performance and asynchronous operation you should use pipes on Linux as
mentioned in [official docs](https://nodejs.org/api/process.html#process_a_note_on_process_i_o).
This also enables you to do file logging as efficiently as possible.

`console` uses process.stdout.write which has the same behaviour as this library.

## Installation

```
npm install polog
```

## Options

Options can be passed as object before creation.

**debug** - `true/false` - enable output of `.debug` function, if set to `false` (default) it won't print anything

```
const log = require("polog")({ debug: true })
log.debug("will be shown")
```

**format** - `true/false` - enable usage of util.format, ie:

```
const log = require("polog")({ format: true })
log.info("test: %d", Math.random())
```

if set to `false` (default), which is faster, use ES6 template strings

```
log.info("test: ${Math.random()}")
```

**prefix** - `function` - prefix messages with custom output, default is `Date.now`
```
const log = require("../index.js")({ prefix: () => { return (new Date).toISOString() }})
```

Keep in mind that this is also called on every message output, so you want to keep it as simple as
possible.

**json** - `true/false` - use json array format, defaults to `false`
```
const log = require("polog")({ json: true })
log.info("json")
```

## Levels

There are four standard levels:

**info** `I` - standard `stdout` output

**debug** `D` - debug `stdout` output, depens on `debug` options, useful for (NON)PRODUCTION
environment switching

**warn** `W` - `stderr` warnings output

**error** `E` - `stderr` error output

Currently there is no way to add new levels, if that is wanted, please open an issue.

## Standard logging

```
const log = require("polog")({ debug: true })

log.debug("debug mode") // shown only when debug is set to true above
log.info("hello there!")
log.warn("be careful")
log.error("not good")
```

This will output:

```
1494005876469 D debug mode
1494005876469 I hello there!
1494005876470 W be careful
1494005876470 E not good
```

Using `format` option:

```
const log = require("polog")({ format: true })

log.info("test message: %d", Math.random())
```
outputs:

```
// # 1494006079148 I test message: 0.17100814691155053
```
This calls [util.format](https://nodejs.org/api/util.html#util_util_format_format_args) that is also
used by `console.*` functions. It is slower since every message has to be processed first. It is
recommended to use ES6 template string instead:

```
const log = require("polog")()

log.info(`test message: ${Math.random()}`)
````

Changing `prefix`:

```
const log = require("../index.js")({ prefix: () => { return (new Date).toISOString() }})

log.info("test message")
```

outputs:
```
2017-05-05T17:53:05.702Z I test message
```

This is probably more user friendly, altough default `Date.now` is faster since Date object doesn't
have to be created for every function call.

Using `json`:

```
const log = require("../index.js")({ json: true })

log.info("test message")
```

outputs:
```
[1494153657008,"I","json!"]
```

## Fast file logging on Linux

Redirect (pipe) all logs to a file [asynchronously](https://nodejs.org/api/process.html#process_a_note_on_process_i_o)

```
node app.js > app.log 2>&1
```

Split standard and error logs

```
node app.js > access.log 2>error.log
```

## [Benchmarks](benchmarks)

This should be the fastest logging library for Node.js as far as we know. [Test](benchmarks) it
yourself and provide feedback.

## Support

 * Issues - [open new issue](https://github.com/pkoretic/polog/issues)
 * mail - petar.koretic@gmail.com
 * IRC - `pkoretic` on freenode

## Changelog

**1.1.0** Adds `json` support.

**1.0.0** Initial release
