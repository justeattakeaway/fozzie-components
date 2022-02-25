import Vue from 'vue';

const appendStandardProperties = (logPayload, message, level, mode) => {
    logPayload.message = message || 'No message provided';
    logPayload.Level = level || 'error'; // Intentionally uppercased property
    logPayload.mode = mode || 'client';
};

const logger = {
    error: (logMessage, error, tags, logPayload = {}) => {
        appendStandardProperties(logPayload, logMessage, 'Error', 'client');
        console.error(logMessage, tags, logPayload);
    },
    earn: (logMessage, tags, logPayload = {}) => {
        appendStandardProperties(logPayload, logMessage, 'Warn', 'client');
        console.warn(logMessage, tags, logPayload);
    },
    enfo: (logMessage, tags, logPayload = {}) => {
        appendStandardProperties(logPayload, logMessage, 'Info', 'client');
        console.log(logMessage, tags, logPayload);
    }
};

Vue.prototype.$logger = logger;
