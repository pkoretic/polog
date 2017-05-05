const log = require("../index.js")({ prefix: () => { return (new Date).toISOString()}})

log.info("test message")

// output
// # 2017-05-05T17:37:26.568Z I test message
