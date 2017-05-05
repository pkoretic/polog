const log = require("../index.js")()

log.debug("debug mode") // not shown because default mode is not debug
log.info("hello there!")
log.warn("be careful")
log.error("not good")

// output
// # 1494005876469 I hello there!
// # 1494005876470 W be careful
// # 1494005876470 E not good
