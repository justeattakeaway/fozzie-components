import getExclusions from './payloads/get-exclusions.json';
import putExclusions from './payloads/put-exclusions.json';

const httpStatusCodes = {
    ok: 200,
    unauthorized: 403,
    internalServerError: 500
};

const httpVerbs = {
    get: 'GET',
    put: 'PUT'
};

const apiStates = {
    none: 'no-issues',
    apiGetExclusionsUnauthorized: 'get-details-403',
    apiGetExclusionsFailed: 'get-details-500',
    apiPutExclusionsFailed: 'put-details-500'
};

// Exclusions
const exclusionsGET200 = {
    // GET exclusions successfully
    url: '/consumers/au/me/exclusions',
    method: httpVerbs.get,
    responseStatus: httpStatusCodes.ok,
    requestData: null,
    responseData: getExclusions
};

const exclusionsGET500 = {
    // Failed GET exclusions
    url: '/consumers/au/me/exclusions',
    method: httpVerbs.get,
    responseStatus: httpStatusCodes.internalServerError,
    requestData: null,
    responseData: null
};

const exclusionsGET403 = {
    // Failed GET exclusions - unauthorized
    url: '/consumers/au/me/exclusions',
    method: httpVerbs.get,
    responseStatus: httpStatusCodes.unauthorized,
    requestData: null,
    responseData: null
};

const exclusionsPUT200 = {
    // PUT exclusions successfully
    url: '/consumers/au/me/exclusions/alcohol',
    method: httpVerbs.put,
    responseStatus: httpStatusCodes.ok,
    requestData: null,
    responseData: putExclusions
};

const exclusionsPUT500 = {
    // Fail to PUT exclusions
    url: '/consumers/au/me/exclusions/alcohol',
    method: httpVerbs.put,
    responseStatus: httpStatusCodes.internalServerError,
    requestData: null,
    responseData: null
};

const apiDefinitions = [
    {
        state: apiStates.none,
        states: [
            exclusionsGET200,
            exclusionsPUT200
        ]
    },
    {
        state: apiStates.apiGetExclusionsUnauthorized,
        states: [
            exclusionsGET403, // Unauthorized
            exclusionsPUT200
        ]
    },
    {
        state: apiStates.apiGetExclusionsFailed,
        states: [
            exclusionsGET500, // Fail
            exclusionsPUT200
        ]
    },
    {
        state: apiStates.apiPutExclusionsFailed,
        states: [
            exclusionsGET200,
            exclusionsPUT500 // Fail
        ]
    }
];

export const apiStateOptions = {
    title: 'Set Api State',
    default: apiStates.none,
    states: [
        apiStates.none,
        apiStates.apiGetExclusionsUnauthorized,
        apiStates.apiGetExclusionsFailed,
        apiStates.apiPutExclusionsFailed
    ]
};

/**
* Prepares the GET/PUT mocks for the api calls to reflect what value the Storybook Control equals.
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


