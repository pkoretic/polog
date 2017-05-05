const log = require("../index.js")({ format: true })

log.info("test message: %d", Math.random() )

// output
// # 1494006079148 I test message: 0.17100814691155053
