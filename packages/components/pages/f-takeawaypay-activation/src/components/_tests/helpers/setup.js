import tenantConfigs from '../../../tenants';

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

const $log = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};

export {
    i18n,
    $log
};
