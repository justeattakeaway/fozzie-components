import getConsumerDetails from './payloads/get-consumer-details.json';
import getConsumerAddresses from './payloads/get-consumer-addresses.json';

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

const apiGetAddressesStateDefinitions = {
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

const apiGetDetailsStateDefinitions = {
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
* Prepares the api mocks to reflect what value the 'Set Api State' Storybook Knobs equals.
* @param {apiStates} apiState - The value of the 'Set Api State' Storybook Knob (defaults to 'none')
*/
export const setupApiState = ({
    apiGetDetailsState = apiStates.none,
    apiGetAddresseState = apiStates.none
}) => {
    process.mockFactory.reset();

    // Get Details
    Object.entries(apiGetDetailsStateDefinitions).forEach(e => {
        const [, definition] = e;

        if (definition.state === apiGetDetailsState) {
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
    Object.entries(apiGetAddressesStateDefinitions).forEach(e => {
        const [, definition] = e;

        if (definition.state === apiGetAddresseState) {
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
