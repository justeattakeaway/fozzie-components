import getConsumerDetails from './payloads/get-consumer-details.json';
import getConsumerAddresses from './payloads/get-consumer-addresses.json';

const httpStatusCodes = {
    ok: 200,
    internalServerError: 500
};

const httpVerbs = {
    get: 'GET',
    patch: 'PATCH'
};

const apiStates = {
    none: 'no-issues',
    apiGetDetailsFailed: 'get-details-fails',
    apiGetAddressFailed: 'get-address-fails',
    apiPatchDetailsFailed: 'patch-details-fails',
    apiPatchAddressFailed: 'patch-address-fails'
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

const consumerDetailsPATCH200 = {
    // PATCH consumer details successfully
    url: '/consumer',
    method: httpVerbs.patch,
    responseStatus: httpStatusCodes.ok,
    requestData: null,
    responseData: getConsumerDetails
};

const consumerDetailsPATCH500 = {
    // Fail to PATCH consumer details
    url: '/consumer',
    method: httpVerbs.patch,
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

const consumerAddressPATCH200 = {
    // PATCH consumer address successfully
    url: '/consumer/addresses',
    method: httpVerbs.patch,
    responseStatus: httpStatusCodes.ok,
    requestData: null,
    responseData: getConsumerAddresses
};

const consumerAddressPATCH500 = {
    // Failed to PATCH consumer address
    url: '/consumer/addresses',
    method: httpVerbs.patch,
    responseStatus: httpStatusCodes.internalServerError,
    requestData: null,
    responseData: getConsumerAddresses
};

const apiDefinitions = [
    {
        state: apiStates.none,
        states: [
            consumerDetailsGET200,
            consumerDetailsPATCH200,
            consumerAddressGET200,
            consumerAddressPATCH200
        ]
    },
    {
        state: apiStates.apiPatchDetailsFailed,
        states: [
            consumerDetailsGET200,
            consumerDetailsPATCH500, // Fail
            consumerAddressGET200,
            consumerAddressPATCH200
        ]
    },
    {
        state: apiStates.apiPatchAddressFailed,
        states: [
            consumerDetailsGET200,
            consumerDetailsPATCH200,
            consumerAddressGET200,
            consumerAddressPATCH500 // Fail
        ]
    },
    {
        state: apiStates.apiGetDetailsFailed,
        states: [
            consumerDetailsGET500, // Fail
            consumerDetailsPATCH200,
            consumerAddressGET200,
            consumerAddressPATCH200
        ]
    },
    {
        state: apiStates.apiGetAddressFailed,
        states: [
            consumerDetailsGET200,
            consumerDetailsPATCH200,
            consumerAddressGET500, // Fail
            consumerAddressPATCH200
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
        apiStates.apiPatchDetailsFailed,
        apiStates.apiPatchAddressFailed
    ]
};

/**
* Prepares the GET/PATCH mocks for the api calls to reflect what value the Storybook Control equals.
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


