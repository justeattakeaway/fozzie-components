const LOG_INFO = 'logInfo';
const LOG_WARN = 'logWarn';
const LOG_ERROR = 'logError';

// eslint-disable-next-line import/prefer-default-export
export class LogService {
    constructor (callback) {
        this.$logger = callback;
    }

    /**
     * Log info to callback
     * @param {string} logMessage - Describe what happened
     * @param {object} [payload={}] - Any additional properties you want to add to the logs
     */
    info (logMessage, payload) {
        this.$logger(LOG_INFO, logMessage, payload);
    }

    /**
     * Log a warning to callback
     * @param {string} logMessage - Describe what happened
     * @param {object} [payload={}] - Any additional properties you want to add to the logs
     */
    warn (logMessage, payload) {
        this.$logger(LOG_WARN, logMessage, payload);
    }

    /**
     * Log error to callback
     * @param {string} logMessage - Describe what happened
     * @param {object} [payload={}] - Any additional properties you want to add to the logs
     */
    error (logMessage, payload) {
        this.$logger(LOG_ERROR, logMessage, payload);
    }
}
