module.exports = function(debugMode = false)
{
    const writeSync = require("fs").writeSync
    const format = require("util").format
    const EOL = require('os').EOL

    return {
        info: function(...msg) { writeSync(1, (new Date).toISOString() + " I " + format(...msg) + EOL )},
        debug: !debugMode ? ()=>{} : function(...msg) { writeSync(1, (new Date).toISOString() + " D " + format(...msg) + EOL )},
        error: function(...msg) { writeSync(2, (new Date).toISOString() + " E " + format(...msg) + EOL )},
        warn: function(...msg) { writeSync(2, (new Date).toISOString() + " W " + format(...msg) + EOL )}
    }
}
