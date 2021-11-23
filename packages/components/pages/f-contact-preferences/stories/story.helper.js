import getConsumerPreferences from './payloads/get-consumer-preferences.json';

export const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU';

const httpStatusCodes = {
    ok: 200,
    internalServerError: 500
};

const httpVerbs = {
    get: 'GET',
    post: 'POST'
};

export const apiStates = {
    none: null,
    apiPostFailed: 'api-post-failed'
};

export const apiStateOptions = {
    title: 'Set Api State',
    states: {
        None: apiStates.none,
        'The POST/SUBMIT fails (change a value then click `Save Changes`)': apiStates.apiPostFailed
    }
};

const apiStateDefinitions1 = {
    getContactPreferencesDefault: {
        url: '/consumer/preferences',
        method: httpVerbs.get,
        responseStatus: httpStatusCodes.ok,
        requestData: null,
        responseData: getConsumerPreferences,
        state: apiStates.none
    },
    postContactPreferencesNewsEmail: {
        url: '/consumer/preferences',
        method: httpVerbs.post,
        responseStatus: httpStatusCodes.ok,
        requestData: null,
        responseData: getConsumerPreferences,
        state: apiStates.none
    },
    getContactPreferencesUnknownApiFailure: {
        url: '/consumer/preferences',
        method: httpVerbs.get,
        responseStatus: httpStatusCodes.ok,
        requestData: null,
        responseData: getConsumerPreferences,
        state: apiStates.apiPostFailed
    },
    postContactPreferencesUnknownApiFailure: {
        url: '/consumer/preferences',
        method: httpVerbs.post,
        responseStatus: httpStatusCodes.internalServerError,
        requestData: null,
        responseData: getConsumerPreferences,
        state: apiStates.apiPostFailed
    }
};

const apiStateDefinitions = {
    none: { // Good GET and good POST
        state: apiStates.none,
        states: [{
            url: '/consumer/preferences',
            method: httpVerbs.get,
            responseStatus: httpStatusCodes.ok,
            requestData: null,
            responseData: getConsumerPreferences
        }, {
            url: '/consumer/preferences',
            method: httpVerbs.post,
            responseStatus: httpStatusCodes.ok,
            requestData: null,
            responseData: getConsumerPreferences
        }]
    },
    apiPostFailed: { // Good GET but bad POST
        state: apiStates.apiPostFailed,
        states: [{
            url: '/consumer/preferences',
            method: httpVerbs.get,
            responseStatus: httpStatusCodes.ok,
            requestData: null,
            responseData: getConsumerPreferences
        }, {
            url: '/consumer/preferences',
            method: httpVerbs.post,
            responseStatus: httpStatusCodes.internalServerError,
            requestData: null,
            responseData: getConsumerPreferences
        }]
    }
};

/**
* Prepares the api mocks to reflect what value the 'Set Api State' Storybook Knob equals.
* @param {apiStates} apiState - The value of the 'Set Api State' Storybook Knob (defaults to 'none')
*/
export const setupApiState = ({
    apiState = apiStates.none
}) => {
    process.mockFactory.reset();

    Object.entries(apiStateDefinitions).forEach(e => {
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

/**
* Prepares the pre-loaded data (from the api mock) to reflect what values the 'Opted In' Storybook Knobs equals.
* @param {object} store - The current registered store in the story file
* @param {boolean} emailState - The selected value of the 'News - Email - Opted In' Storybook Knob (defaults to 'false', i.e data unchanged from api mock)
* @param {boolean} smsState - The selected value of the 'News - Sms - Opted In' Storybook Knob (defaults to 'false', i.e data unchanged from api mock)
*/
export const setupNewsDataState = ({
    store = {},
    emailState = false,
    smsState = false
} = {}) => {
    store.dispatch('fContactPreferencesModule/editPreference', { key: 'news', field: 'emailValue', value: emailState });
    store.dispatch('fContactPreferencesModule/editPreference', { key: 'news', field: 'smsValue', value: smsState });
};
