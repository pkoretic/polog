const log = require("../index.js")({ debug: true })

log.debug("debug mode") // shown because of debug mode
log.info("hello there!")
log.warn("be careful")
log.error("not good")

// output
// # 1494005876469 D debug mode
// # 1494005876469 I hello there!
// # 1494005876470 W be careful
// # 1494005876470 E not good
