module.exports = function(options = {})
{
    const debugMode = options.debug || false
    const format = options.format ? require("util").format : false
    const prefix = options.prefix || Date.now
    const json = options.json || false

    const writeSync = require("fs").writeSync
    const EOL = require('os').EOL
	const JEOL = '"]' + EOL

    let logger = json ? format ? {
        info: (...msg) => { writeSync(1, '[' + JSON.stringify(prefix()) + ',"I","' + format(...msg) + JEOL )},
        debug: !debugMode ? ()=>{} : (...msg) => { writeSync(1, '[' + JSON.stringify(prefix()) + ',"D","' + format(...msg) + JEOL )},
        error: (...msg) => { writeSync(2, '[' + JSON.stringify(prefix()) + ',"E","' + format(...msg) + JEOL )},
        warn: (...msg) => { writeSync(2, '[' + JSON.stringify(prefix()) + ',"W","' + format(...msg) + JEOL )}
    } : {
        info: msg => { writeSync(1, '[' + JSON.stringify(prefix()) + ',"I","' + msg + JEOL )},
        debug: !debugMode ? ()=>{} : msg => { writeSync(1, '[' + JSON.stringify(prefix()) + ',"D","' + msg + JEOL )},
        error: msg => { writeSync(2, '[' + JSON.stringify(prefix()) + ',"E","' + msg + JEOL )},
        warn: msg  => { writeSync(2, '[' + JSON.stringify(prefix()) + ',"W","' + msg + JEOL )}
    } : format ? {
        info: (...msg) => { writeSync(1, prefix() + " I " + format(...msg) + EOL )},
        debug: !debugMode ? ()=>{} : (...msg) => { writeSync(1, prefix() + " D " + format(...msg) + EOL )},
        error: (...msg) => { writeSync(2, prefix() + " E " + format(...msg) + EOL )},
        warn: (...msg) => { writeSync(2, prefix() + " W " + format(...msg) + EOL )}
    } : {
        info: msg => { writeSync(1, prefix() + " I " + msg + EOL )},
        debug: !debugMode ? ()=>{} : msg => { writeSync(1, prefix() + " D " + msg + EOL )},
        error: msg => { writeSync(2, prefix() + " E " + msg + EOL )},
        warn: msg  => { writeSync(2, prefix() + " W " + msg + EOL )}
    }

    logger.debugMode = debugMode

    // create debug function
    logger.enableDebug = () => {
        logger.debugMode = true

        logger.debug = json ? format ?
            (...msg) => { writeSync(1, '[' + JSON.stringify(prefix()) + ',"D","' + format(...msg) + JEOL )} :
            msg => { writeSync(1, '[' + JSON.stringify(prefix()) + ',"D","' + msg + JEOL )} :
            format ? (...msg) => { writeSync(1, prefix() + " D " + format(...msg) + EOL )} :
            msg => { writeSync(1, prefix() + " D " + msg + EOL )}
    }

    // remove debug function
    logger.disableDebug = () => { logger.debugMode = false; logger.debug = () => {}}

    return logger
}
