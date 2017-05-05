const log = require("../index.js")(true)

log.debug("debug mode") // shown only when debug is set to true above
log.info("hello there!")
log.warn("be careful")
log.error("not good")
