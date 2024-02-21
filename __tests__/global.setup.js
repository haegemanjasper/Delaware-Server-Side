const config = require("config");
const { initializeLogger } = require("../src/core/logging");

module.exports = async () => {
    initializeLogger({
        level: config.get("log.level"),
        disabled: config.get("log.disabled"),
    });
}
