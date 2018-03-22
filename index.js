module.exports = function(options = {})
{
    let logger = { debugMode: false }
    logger.info = logger.debug = logger.error = logger.warn = logger.enableDebug = logger.disableDebug = () => {}

    // support ability to supress logs for testing
    if(process.env.NOLOG === "true")
        return logger

    const debugMode = options.debug || false
    const format = options.format ? require("util").format : false
    const prefix = options.prefix || Date.now
    const json = options.json || false

    const EOL = require('os').EOL
    const JEOL = '"]' + EOL

    logger = json ? format ? {
        info: (...msg) => { process.stdout.write('[' + JSON.stringify(prefix()) + ',"I","' + format(...msg) + JEOL )},
        debug: !debugMode ? ()=>{} : (...msg) => { process.stdout.write('[' + JSON.stringify(prefix()) + ',"D","' + format(...msg) + JEOL )},
        error: (...msg) => { process.stderr.write('[' + JSON.stringify(prefix()) + ',"E","' + format(...msg) + JEOL )},
        warn: (...msg) => { process.stderr.write('[' + JSON.stringify(prefix()) + ',"W","' + format(...msg) + JEOL )}
    } : {
        info: msg => { process.stdout.write('[' + JSON.stringify(prefix()) + ',"I","' + msg + JEOL )},
        debug: !debugMode ? ()=>{} : msg => { process.stdout.write('[' + JSON.stringify(prefix()) + ',"D","' + msg + JEOL )},
        error: msg => { process.stderr.write('[' + JSON.stringify(prefix()) + ',"E","' + msg + JEOL )},
        warn: msg  => { process.stderr.write('[' + JSON.stringify(prefix()) + ',"W","' + msg + JEOL )}
    } : format ? {
        info: (...msg) => { process.stdout.write(prefix() + " I " + format(...msg) + EOL )},
        debug: !debugMode ? ()=>{} : (...msg) => { process.stdout.write(prefix() + " D " + format(...msg) + EOL )},
        error: (...msg) => { process.stderr.write(prefix() + " E " + format(...msg) + EOL )},
        warn: (...msg) => { process.stderr.write(prefix() + " W " + format(...msg) + EOL )}
    } : {
        info: msg => { process.stdout.write(prefix() + " I " + msg + EOL )},
        debug: !debugMode ? ()=>{} : msg => { process.stdout.write(prefix() + " D " + msg + EOL )},
        error: msg => { process.stderr.write(prefix() + " E " + msg + EOL )},
        warn: msg  => { process.stderr.write(prefix() + " W " + msg + EOL )}
    }

    logger.debugMode = debugMode

    // create debug function
    logger.enableDebug = () => {
        logger.debugMode = true

        logger.debug = json ? format ?
            (...msg) => { process.stdout.write('[' + JSON.stringify(prefix()) + ',"D","' + format(...msg) + JEOL )} :
            msg => { process.stdout.write('[' + JSON.stringify(prefix()) + ',"D","' + msg + JEOL )} :
            format ? (...msg) => { process.stdout.write(prefix() + " D " + format(...msg) + EOL )} :
            msg => { process.stdout.write(prefix() + " D " + msg + EOL )}
    }

    // remove debug function
    logger.disableDebug = () => { logger.debugMode = false; logger.debug = () => {}}

    return logger
}
