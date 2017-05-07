const log = require("../index.js")({ json: true, debug: true })

log.info("json!")
log.debug("json!")
log.error("json!")
log.warn("json!")

// output
// # [1494155607086,"I","json!"]
// # [1494155607086,"D","json!"]
// # [1494155607086,"E","json!"]
// # [1494155607086,"W","json!"]
