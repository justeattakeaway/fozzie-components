/**
 * Default logger implementation.  The interface is a subset of that used in f-logger
 */
const logger = {
    logError (logMessage) {
        if (console && console.error) {
            console.error(logMessage);
        }
    },
    logWarn (logMessage) {
        if (console && console.warn) {
            console.warn(logMessage);
        }
    },
    logInfo (logMessage) {
        if (console && console.info) {
            console.info(logMessage);
        }
    }
};

/**
 * Allows logError, logWarn and logInfo to be overridden with custom implementation.
 * @param {object} loggerOverrides
 */
function setLogger (loggerOverrides) {
    Object.assign(logger, loggerOverrides);
}

export { logger, setLogger };
