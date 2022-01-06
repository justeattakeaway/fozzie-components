import getConsumerDetails from './payloads/get-consumer-details.json';
import getConsumerAddresses from './payloads/get-consumer-addresses.json';

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

export const apiGetPostDetailsStateOptions = {
    title: 'Set Api Get/Post Details State',
    states: {
        None: apiStates.none,
        'The POST consumer details fails (change a value then click `Save Changes`)': apiStates.apiPostFailed
    }
};

export const apiGetPostAddressesStateOptions = {
    title: 'Set Api Get/Post Addresses State',
    states: {
        None: apiStates.none,
        'The POST consumer address fails (change a value then click `Save Changes`)': apiStates.apiPostFailed
    }
};

const apiAddressesStateDefinitions = {
    none: { // Good GET and good POST
        state: apiStates.none,
        states: [{
            url: '/consumer/addresses',
            method: httpVerbs.get,
            responseStatus: httpStatusCodes.ok,
            requestData: null,
            responseData: getConsumerAddresses
        }, {
            url: '/consumer/addresses',
            method: httpVerbs.post,
            responseStatus: httpStatusCodes.ok,
            requestData: null,
            responseData: getConsumerAddresses
        }]
    },
    apiPostFailed: { // Good GET but bad POST
        state: apiStates.apiPostFailed,
        states: [{
            url: '/consumer/addresses',
            method: httpVerbs.get,
            responseStatus: httpStatusCodes.ok,
            requestData: null,
            responseData: getConsumerAddresses
        }, {
            url: '/consumer/addresses',
            method: httpVerbs.post,
            responseStatus: httpStatusCodes.internalServerError,
            requestData: null,
            responseData: getConsumerAddresses
        }]
    }
};

const apiDetailsStateDefinitions = {
    none: { // Good GET and good POST
        state: apiStates.none,
        states: [{
            url: '/consumer',
            method: httpVerbs.get,
            responseStatus: httpStatusCodes.ok,
            requestData: null,
            responseData: getConsumerDetails
        }, {
            url: '/consumer',
            method: httpVerbs.post,
            responseStatus: httpStatusCodes.ok,
            requestData: null,
            responseData: getConsumerDetails
        }]
    },
    apiPostFailed: { // Good GET but bad POST
        state: apiStates.apiPostFailed,
        states: [{
            url: '/consumer',
            method: httpVerbs.get,
            responseStatus: httpStatusCodes.ok,
            requestData: null,
            responseData: getConsumerDetails
        }, {
            url: '/consumer',
            method: httpVerbs.post,
            responseStatus: httpStatusCodes.internalServerError,
            requestData: null,
            responseData: getConsumerDetails
        }]
    }
};

/**
* Prepares the GET/POST mocks for the api calls to reflect what value the Storybook Knobs equals.
* @param {apiStates} apiDetailsState - The current set value of the 'Details' Storybook Knob (defaults to 'none')
* @param {apiStates} apiAddressState - The current set value of the 'Address' Storybook Knob (defaults to 'none')
*/
export const setupApiState = ({
    apiDetailsState = apiStates.none,
    apiAddressState = apiStates.none
}) => {
    process.mockFactory.reset();

    // Get Details
    Object.entries(apiDetailsStateDefinitions).forEach(e => {
        const [, definition] = e;

        if (definition.state === apiDetailsState) {
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

    // Get Addresses
    Object.entries(apiAddressesStateDefinitions).forEach(e => {
        const [, definition] = e;

        if (definition.state === apiAddressState) {
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
