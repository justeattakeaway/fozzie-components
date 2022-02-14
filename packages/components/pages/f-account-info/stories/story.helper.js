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

const apiStates = {
    none: 'no-issues',
    apiGetDetailsFailed: 'get-details-fails',
    apiGetAddresssFailed: 'get-address-fails',
    apiPostDetailsFailed: 'post-details-fails',
    apiPostAddressFailed: 'post-address-fails'
};

export const apiStateOptions = {
    title: 'Set Api State',
    default: apiStates.none,
    states: [
        apiStates.none,
        apiStates.apiGetDetailsFailed,
        apiStates.apiGetAddresssFailed,
        apiStates.apiPostDetailsFailed,
        apiStates.apiPostAddressFailed
    ]
};

const apiDefinitions = {
    none: {
        state: apiStates.none,
        states: [
            {
                // GET consumer address successfully
                url: '/consumer/addresses',
                method: httpVerbs.get,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerAddresses
            },
            {
                // POST consumer address successfully
                url: '/consumer/addresses',
                method: httpVerbs.post,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerAddresses
            },
            {
                // GET consumer details successfully
                url: '/consumer',
                method: httpVerbs.get,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerDetails
            },
            {
                // POST consumer details successfully
                url: '/consumer',
                method: httpVerbs.post,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerDetails
            }
        ]
    },
    apiPostDetailsFailed: {
        state: apiStates.apiPostDetailsFailed,
        states: [
            {
                // GET consumer address successfully
                url: '/consumer/addresses',
                method: httpVerbs.get,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerAddresses
            },
            {
                // POST consumer address successfully
                url: '/consumer/addresses',
                method: httpVerbs.post,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerAddresses
            },
            {
                // GET consumer details successfully
                url: '/consumer',
                method: httpVerbs.get,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerDetails
            },
            {
                // Fail to POST consumer details
                url: '/consumer',
                method: httpVerbs.post,
                responseStatus: httpStatusCodes.internalServerError,
                requestData: null,
                responseData: getConsumerDetails
            }
        ]
    },
    apiPostAddressFailed: {
        state: apiStates.apiPostAddressFailed,
        states: [
            {
                // GET consumer address successfully
                url: '/consumer/addresses',
                method: httpVerbs.get,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerAddresses
            },
            {
                // Failed to POST consumer address
                url: '/consumer/addresses',
                method: httpVerbs.post,
                responseStatus: httpStatusCodes.internalServerError,
                requestData: null,
                responseData: getConsumerAddresses
            },
            {
                // GET consumer details successfully
                url: '/consumer',
                method: httpVerbs.get,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerDetails
            },
            {
                // POST consumer details successfully
                url: '/consumer',
                method: httpVerbs.post,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerDetails
            }
        ]
    },
    apiGetDetailsFailed: {
        state: apiStates.apiGetDetailsFailed,
        states: [
            {
                // GET consumer address successfully
                url: '/consumer/addresses',
                method: httpVerbs.get,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerAddresses
            },
            {
                // POST consumer address successfully
                url: '/consumer/addresses',
                method: httpVerbs.post,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerAddresses
            },
            {
                // Failed GET consumer details
                url: '/consumer',
                method: httpVerbs.get,
                responseStatus: httpStatusCodes.internalServerError,
                requestData: null,
                responseData: null
            },
            {
                // POST consumer details successfully
                url: '/consumer',
                method: httpVerbs.post,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerDetails
            }
        ]
    },
    apiGetAddressFailed: {
        state: apiStates.apiGetAddressFailed,
        states: [
            {
                // Failed to GET consumer address
                url: '/consumer/addresses',
                method: httpVerbs.get,
                responseStatus: httpStatusCodes.internalServerError,
                requestData: null,
                responseData: null
            },
            {
                // POST consumer address successfully
                url: '/consumer/addresses',
                method: httpVerbs.post,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerAddresses
            },
            {
                // GET consumer details successfully
                url: '/consumer',
                method: httpVerbs.get,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerDetails
            },
            {
                // POST consumer details successfully
                url: '/consumer',
                method: httpVerbs.post,
                responseStatus: httpStatusCodes.ok,
                requestData: null,
                responseData: getConsumerDetails
            }
        ]
    }
};

/**
* Prepares the GET/POST mocks for the api calls to reflect what value the Storybook Control equals.
* @param {apiStates} apiState - The current set value of the requested api state
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
