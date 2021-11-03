import Vue from 'vue';

const LEVEL = {
    Error: 'Error',
    Info: 'Info',
    Warn: 'Warn'
};

export default () => {
    const appendStandardProperties = (logPayload, message, level, mode, tags) => {
        let tagsArr = [];
        if (tags) { tagsArr = Array.isArray(tags) ? tags : [tags]; }

        logPayload.message = message || 'No message provided';
        logPayload.Level = level || 'error';
        logPayload.mode = mode || '';
        logPayload.tags = tagsArr;
    };

    const log = {
        error (message, exception, tags, payload = {}) {
            appendStandardProperties(payload, message, LEVEL.Error, 'client', tags);
            console.error(message, payload);
        },
        warn (message, tags, payload = {}) {
            appendStandardProperties(payload, message, LEVEL.Warn, 'client', tags);
            console.warn(message, payload);
        },
        info (message, tags, payload = {}) {
            appendStandardProperties(payload, message, LEVEL.Info, 'client', tags);
            console.info(message, payload);
        }
    };

    Vue.prototype.$log = log;
};

