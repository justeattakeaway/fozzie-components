import getConsumerPreferences from './payloads/get-consumer-preferences.json';

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
