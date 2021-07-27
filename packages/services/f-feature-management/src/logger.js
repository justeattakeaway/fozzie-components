/**
 * Default logger implementation.  The interface matches that used by various Fozzie components.
 */
const logger = {
    logError (logMessage, store, logPayload = {}) {
        if (console.error) {
            console.error(logMessage, logPayload);
        }
    },
    logWarn (logMessage, store, logPayload = {}) {
        if (console.warn) {
            console.warn(logMessage, logPayload);
        }
    },
    logInfo (logMessage, store, logPayload = {}) {
        if (console.info) {
            console.info(logMessage, logPayload);
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
