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

export const dataStates = {
    default: null,
    newsEmailChecked: 'news-email-checked'
};

export const dataStateOptions = {
    title: 'Set Data State',
    states: {
        Default: dataStates.default,
        'With News.Email checked': dataStates.newsEmailChecked
    }
};

const dataStateDefinitions = {
    default: {
        state: dataStates.default,
        states: [{
            key: 'news',
            field: 'emailValue',
            value: false
        }, {
            key: 'news',
            field: 'smsValue',
            value: false
        }]
    },
    newsEmailChecked: {
        state: dataStates.newsEmailChecked,
        states: [{
            key: 'news',
            field: 'emailValue',
            value: true
        }, {
            key: 'news',
            field: 'smsValue',
            value: false
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

        if (apiState === definition.state) {
            console.log('Setting Api State : ', definition); // eslint-disable-line

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
* Prepares the pre-loaded data (from the api mock) to reflect what value the 'Set Data State' Storybook Knob equals.
* @param {object} store - The current registered store in the story file
* @param {dataStates} dataState - The selected value of the 'Set Data State' Storybook Knob (defaults to 'default', i.e data unchanged from api mock)
*/
export const setupDataState = ({
    store = {},
    dataState = dataStates.default
}) => {
    Object.entries(dataStateDefinitions).forEach(e => {
        const [, definition] = e;

        if (definition.state === dataState) {
            console.log('Setting Data State : ', definition.states); // eslint-disable-line

            definition.states.forEach(x => {
                store.dispatch('fContactPreferencesModule/editPreference', { key: x.key, field: x.field, value: x.value });
            });
        }
    });
};
