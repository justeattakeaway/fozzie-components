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
    apiGetAddressFailed: 'get-address-fails',
    apiPostDetailsFailed: 'post-details-fails',
    apiPostAddressFailed: 'post-address-fails'
};

// Consumer Details
const consumerDetailsGET200 = {
    // GET consumer details successfully
    url: '/consumer',
    method: httpVerbs.get,
    responseStatus: httpStatusCodes.ok,
    requestData: null,
    responseData: getConsumerDetails
};

const consumerDetailsGET500 = {
    // Failed GET consumer details
    url: '/consumer',
    method: httpVerbs.get,
    responseStatus: httpStatusCodes.internalServerError,
    requestData: null,
    responseData: null
};

const consumerDetailsPOST200 = {
    // POST consumer details successfully
    url: '/consumer',
    method: httpVerbs.post,
    responseStatus: httpStatusCodes.ok,
    requestData: null,
    responseData: getConsumerDetails
};

const consumerDetailsPOST500 = {
    // Fail to POST consumer details
    url: '/consumer',
    method: httpVerbs.post,
    responseStatus: httpStatusCodes.internalServerError,
    requestData: null,
    responseData: getConsumerDetails
};

// Consumer Address
const consumerAddressGET200 = {
    // GET consumer address successfully
    url: '/consumer/addresses',
    method: httpVerbs.get,
    responseStatus: httpStatusCodes.ok,
    requestData: null,
    responseData: getConsumerAddresses
};

const consumerAddressGET500 = {
    // Failed to GET consumer address
    url: '/consumer/addresses',
    method: httpVerbs.get,
    responseStatus: httpStatusCodes.internalServerError,
    requestData: null,
    responseData: null
};

const consumerAddressPOST200 = {
    // POST consumer address successfully
    url: '/consumer/addresses',
    method: httpVerbs.post,
    responseStatus: httpStatusCodes.ok,
    requestData: null,
    responseData: getConsumerAddresses
};

const consumerAddressPOST500 = {
    // Failed to POST consumer address
    url: '/consumer/addresses',
    method: httpVerbs.post,
    responseStatus: httpStatusCodes.internalServerError,
    requestData: null,
    responseData: getConsumerAddresses
};

const apiDefinitions = [
    {
        state: apiStates.none,
        states: [
            consumerDetailsGET200,
            consumerDetailsPOST200,
            consumerAddressGET200,
            consumerAddressPOST200
        ]
    },
    {
        state: apiStates.apiPostDetailsFailed,
        states: [
            consumerDetailsGET200,
            consumerDetailsPOST500, // Fail
            consumerAddressGET200,
            consumerAddressPOST200
        ]
    },
    {
        state: apiStates.apiPostAddressFailed,
        states: [
            consumerDetailsGET200,
            consumerDetailsPOST200,
            consumerAddressGET200,
            consumerAddressPOST500 // Fail
        ]
    },
    {
        state: apiStates.apiGetDetailsFailed,
        states: [
            consumerDetailsGET500, // Fail
            consumerDetailsPOST200,
            consumerAddressGET200,
            consumerAddressPOST200
        ]
    },
    {
        state: apiStates.apiGetAddressFailed,
        states: [
            consumerDetailsGET200,
            consumerDetailsPOST200,
            consumerAddressGET500, // Fail
            consumerAddressPOST200
        ]
    }
];

export const apiStateOptions = {
    title: 'Set Api State',
    default: apiStates.none,
    states: [
        apiStates.none,
        apiStates.apiGetDetailsFailed,
        apiStates.apiGetAddressFailed,
        apiStates.apiPostDetailsFailed,
        apiStates.apiPostAddressFailed
    ]
};

/**
* Prepares the GET/POST mocks for the api calls to reflect what value the Storybook Control equals.
* @param {apiStates} apiState - The current set value of the requested api state
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


