const polog = require('../')({})
const pino = require('pino')()
const winston = require('winston')
const log4js = require('log4js').getLogger()

// winston doesn't have time by default
const wlogger = new (winston.Logger) ({
  transports: [
    new (winston.transports.Console) ({
      timestamp: function() {
        return Date.now();
      },
      formatter: function(options) {
        return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '')
      }
    })
  ]
})

const _tag = "[benchmark] "
const size = 10000
const message = "short message log output"

console.info(`${_tag} << writing ${size} lines >>`)

console.time(_tag + "console")
for(let i=0; i<size; i++)
    console.log(Date.now() + message)
console.timeEnd(_tag + "console")

console.time(_tag + "winston")
for(let i=0; i<size; i++)
    wlogger.info(message)
console.timeEnd(_tag + "winston")

console.time(_tag + "log4js")
for(let i=0; i<size; i++)
    log4js.info(message)
console.timeEnd(_tag + "log4js")

console.time(_tag + "pino")
for(let i=0; i<size; i++)
    pino.info(message)
console.timeEnd(_tag + "pino")

console.time(_tag + "polog")
for(let i=0; i<size; i++)
    polog.info(message)
console.timeEnd(_tag + "polog")
