export const newEvent = {
    event: 'jazzy',
    experiment: {
        id: 'EX-1234',
        name: 'Some very special experiment',
        platform: 'experiment_api',
        variant: {
            name: 'increase_a'
        },
        version: 1
    }
};

export const defaultState = {
    platformData: {
        environment: 'localhost',
        name: undefined,
        appType: undefined,
        applicationId: undefined,
        country: undefined,
        language: undefined,
        currency: undefined,
        version: undefined,
        instancePosition: undefined,
        isPilot: undefined,
        source: 'core-analytics'
    },
    userData: {
        'a-UserId': undefined,
        authType: undefined,
        email: undefined,
        globalUserId: undefined,
        signinType: undefined,
        signupDate: undefined
    },
    pageData: {
        name: undefined,
        conversationId: undefined,
        orientation: undefined
    },
    events: []
};

export const options = {
    namespace: 'f-analytics',
    globalVarName: 'gtm',
    featureName: 'test-feature-name',
    locale: 'en-GB',
    id: 'GTM-0000000',
    auth: undefined,
    preview: undefined,
    cookiesWin: undefined,
    anonUserCookieName: 'je-user',
    authTokenType: 'l-je'
};
