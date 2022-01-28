/* eslint-disable camelcase */

const defaultState = {
    interval: null,
    queue: []
};

const log = {
    message: 'This is a message',
    payload: {
        alpha: 'alpha',
        beta: 'beta'
    }
};

const options = {
    namespace: 'f-statistics'
};
const basePayload = {
    je_feature: 'f-statistics',
    je_logType: 'client-stats',
    je_environment: 'test',
    je_feature_for: 'Generic Front End'
};

export {
    defaultState,
    options,
    log,
    basePayload
};
