import Vue from 'vue';

export default () => {
    const appendStandardProperties = (logPayload, message, level, mode) => {
        logPayload.message = message || 'No message provided';
        logPayload.Level = level || 'error'; // Intentionally uppercased property
        logPayload.mode = mode || 'client';
    };

    const logger = {
        logError: (logMessage, store, logPayload = {}) => {
            appendStandardProperties(logPayload, logMessage, 'Error', 'client');
            console.error(logMessage, logPayload);
        },
        logWarn: (logMessage, store, logPayload = {}) => {
            appendStandardProperties(logPayload, logMessage, 'Warn', 'client');
            console.warn(logMessage, logPayload);
        },
        logInfo: (logMessage, store, logPayload = {}) => {
            appendStandardProperties(logPayload, logMessage, 'Info', 'client');
            console.log(logMessage, logPayload);
        }
    };

    Vue.prototype.$logger = logger;
};

