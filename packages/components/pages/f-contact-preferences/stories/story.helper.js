import getConsumerPreferences from './payloads/get-consumer-preferences.json';

const httpStatusCodes = {
    ok: 200,
    internalServerError: 500
};

const httpVerbs = {
    get: 'GET',
    post: 'POST'
};

const apiStates = {
    none: 'no-issues',
    apiGetFailed: 'get-preferences-fails',
    apiPostFailed: 'post-preferences-fails'
};

export const apiStateOptions = {
    title: 'Set Api State',
    default: apiStates.none,
    states: [
        apiStates.none,
        apiStates.apiGetFailed,
        apiStates.apiPostFailed
    ]
};

const contactPreferencesGET200 = {
    url: '/consumer/preferences',
    method: httpVerbs.get,
    responseStatus: httpStatusCodes.ok,
    requestData: null,
    responseData: getConsumerPreferences
};

const contactPreferencesPOST200 = {
    url: '/consumer/preferences',
    method: httpVerbs.post,
    responseStatus: httpStatusCodes.ok,
    requestData: null,
    responseData: {}
};

const contactPreferencesGET500 = {
    url: '/consumer/preferences',
    method: httpVerbs.get,
    responseStatus: httpStatusCodes.internalServerError,
    requestData: null,
    responseData: {}
};

const contactPreferencesPOST500 = {
    url: '/consumer/preferences',
    method: httpVerbs.post,
    responseStatus: httpStatusCodes.internalServerError,
    requestData: null,
    responseData: {}
};

const apiDefinitions = [
    {
        state: apiStates.none,
        states: [
            contactPreferencesGET200,
            contactPreferencesPOST200
        ]
    },
    {
        state: apiStates.apiPostFailed,
        states: [
            contactPreferencesGET200,
            contactPreferencesPOST500
        ]
    },
    {
        state: apiStates.apiGetFailed,
        states: [
            contactPreferencesGET500,
            contactPreferencesPOST200
        ]
    }
];

/**
* Prepares the api mocks to reflect what value the 'Set Api State' Storybook Knob equals.
* @param {apiStates} apiState - The value of the 'Set Api State' Storybook Knob (defaults to 'none')
*/
export const setupApiMockState = (apiState = apiStates.none) => {
    process.mockFactory.reset();

    apiDefinitions.find(e => e.state === apiState)?.states.forEach(x => {
        process.mockFactory.setupMockResponse(
            x.method,
            x.url,
            x.requestData,
            x.responseStatus,
            x.responseData
        );
    });

    process.mockFactory.setupPassThrough();
};
