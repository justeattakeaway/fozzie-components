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

const apiStateDefinitions = {
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
    postContactPreferencesUnknownApiFailure: {
        url: '/consumer/preferences',
        method: httpVerbs.post,
        responseStatus: httpStatusCodes.internalServerError,
        requestData: null,
        responseData: getConsumerPreferences,
        state: apiStates.apiPostFailed
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

        if (apiState === definition.state) {
            process.mockFactory.setupMockResponse(
                definition.method,
                definition.url,
                definition.requestData,
                definition.responseStatus,
                definition.responseData
            );
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
