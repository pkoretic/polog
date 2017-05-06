module.exports = function(options = {})
{
    const debugMode = options.debug || false
    const format = options.format ? require("util").format : false
    const prefix = options.prefix || Date.now

    const writeSync = require("fs").writeSync
    const EOL = require('os').EOL

    return format ? {
        info: function(...msg) { writeSync(1, prefix()  + " I " + format(...msg) + EOL )},
        debug: !debugMode ? ()=>{} : function(...msg) { writeSync(1, prefix() + " D " + format(...msg) + EOL )},
        error: function(...msg) { writeSync(2, prefix() + " E " + format(...msg) + EOL )},
        warn: function(...msg) { writeSync(2, prefix() + " W " + format(...msg) + EOL )}
    } : {
        info: function(msg) { writeSync(1, prefix()  + " I " + msg + EOL )},
        debug: !debugMode ? ()=>{} : function(msg) { writeSync(1, prefix() + " D " + msg + EOL )},
        error: function(msg) { writeSync(2, prefix() + " E " + msg + EOL )},
        warn: function(msg) { writeSync(2, prefix() + " W " + msg + EOL )}
    }
}
