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
    responseData: getConsumerPreferences
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
    responseData: getConsumerPreferences
};

const apiDefinitions = {
    none: { // Good GET and good POST
        state: apiStates.none,
        states: [
            contactPreferencesGET200,
            contactPreferencesPOST200
        ]
    },
    apiPostFailed: { // Good GET but bad POST
        state: apiStates.apiPostFailed,
        states: [
            contactPreferencesGET200,
            contactPreferencesPOST500
        ]
    },
    apiGetFailed: { // Bad GET but good POST
        state: apiStates.apiGetFailed,
        states: [
            contactPreferencesGET500,
            contactPreferencesPOST200
        ]
    }
};

/**
* Prepares the api mocks to reflect what value the 'Set Api State' Storybook Knob equals.
* @param {apiStates} apiState - The value of the 'Set Api State' Storybook Knob (defaults to 'none')
*/
export const setupApiMockState = (apiState = apiStates.none) => {
    process.mockFactory.reset();

    Object.entries(apiDefinitions).forEach(e => {
        const [, definition] = e;

        if (definition.state === apiState) {
            definition.states.forEach(x => {
                process.mockFactory.setupMockResponse(
                    x.method,
                    x.url,
                    x.requestData,
                    x.responseStatus,
                    x.responseData
                );
            });
        }
    });

    process.mockFactory.setupPassThrough();
};
