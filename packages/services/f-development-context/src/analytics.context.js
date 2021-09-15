import Vue from 'vue';

// Note this was upto date at the time of publishing
// but does not need to be aligned/maintained as only
// a placeholder.
const platformData = {
    environment: 'storybook',
    name: 'storybook',
    appType: 'web',
    applicationId: 7,
    userAgent: undefined,
    branding: undefined,
    country: undefined,
    language: undefined,
    jeUserPercentage: undefined,
    currency: undefined,
    version: undefined,
    instancePosition: undefined,
    isPilot: undefined
};

const userData = {
    'a-UserId': 'storybook',
    authType: undefined,
    email: undefined,
    globalUserId: undefined,
    signinType: undefined,
    signupDate: undefined
};

const pageData = {
    group: 'storybook',
    name: undefined,
    httpStatusCode: 200,
    conversationId: undefined,
    requestId: undefined,
    orientation: undefined,
    display: undefined
};

// Just placeholder for Storybook to use in place of the global `$gtm`
// It merely console logs what it can under its limited capacity

const gtm = {
    pushPlatformData: ({
        featureName, locale, customFields
    } = {}) => {
        let data = { ...platformData, name: featureName, language: locale };
        if (customFields) {
            data = { ...data, ...customFields };
        }
        console.log('pushPlatformData', { platformData: { ...data } });
    },
    pushUserData: ({
        authToken, customFields
    } = {}) => {
        let data = { ...userData, authType: authToken };
        if (customFields) {
            data = { ...data, ...customFields };
        }
        console.log('pushUserData', { userData: { ...data } });
    },
    pushPageData: ({
        pageName, requestId, httpStatusCode, customFields
    } = {}) => {
        let data = {
            ...pageData, name: pageName, requestId, httpStatusCode
        };
        if (customFields) {
            data = { ...data, ...customFields };
        }
        console.log('pushPageData', { pageData: { ...data } });
    },
    pushEvent: event => {
        console.log('pushEvent', event);
    }
};

Vue.prototype.$gtm = gtm;
