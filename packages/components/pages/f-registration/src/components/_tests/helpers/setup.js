import tenantConfigs from '../../../tenants';

const defaultPropData = {
    locale: 'en-GB',
    createAccountUrl: 'http://localhost/account/register',
    showLoginLink: true,
    loginUrl: '/account/login'
};

const i18n = {
    locale: 'en-GB',
    messages: {
        'en-GB': tenantConfigs['en-GB'].messages
    }
};

export {
    defaultPropData,
    i18n
};
