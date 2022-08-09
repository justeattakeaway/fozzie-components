import {
    SUBMIT_LOGIN_CHALLENGE_URL
} from '../src/constants';

const httpStatusCodes = {
    ok: 200,
    badrequest: 400,
    throttledrequest: 429
};

const httpVerbs = {
    post: 'POST'
};

// Available states for the API mock
const apiStates = {
    none: 'no-issues',
    apiPostFailed400: 'post-otp-fails-due-to-bad-request',
    apiPostFailed429: 'post-otp-fails-due-to-throttled-request'
};

// Mocks for the API calls
const otpPOST200 = {
    url: `http://localhost:8080/${SUBMIT_LOGIN_CHALLENGE_URL}`,
    method: httpVerbs.post,
    responseStatus: httpStatusCodes.ok,
    requestData: { mfa_token: 'ABC123', otp: 'otp123' }, // eslint-disable-line camelcase
    responseData: {}
};

const otpPOST400 = {
    url: `http://localhost:8080/${SUBMIT_LOGIN_CHALLENGE_URL}`,
    method: httpVerbs.post,
    responseStatus: httpStatusCodes.badrequest,
    requestData: { mfa_token: 'ABC123', otp: 'otp123' }, // eslint-disable-line camelcase
    responseData: {}
};

const otpPOST429 = {
    url: `http://localhost:8080/${SUBMIT_LOGIN_CHALLENGE_URL}`,
    method: httpVerbs.post,
    responseStatus: httpStatusCodes.throttledrequest,
    requestData: { mfa_token: 'ABC123', otp: 'otp123' }, // eslint-disable-line camelcase
    responseData: {}
};

// Build the mock definition for the API calls
const apiDefinitions = [
    {
        state: apiStates.none,
        states: [
            otpPOST200
        ]
    },
    {
        state: apiStates.apiPostFailed400,
        states: [
            otpPOST400
        ]
    },
    {
        state: apiStates.apiPostFailed429,
        states: [
            otpPOST429
        ]
    }
];

// The data source for the API state control
export const apiStateControlDataSource = {
    title: 'Set Api State',
    default: apiStates.none,
    states: [
        apiStates.none,
        apiStates.apiPostFailed400,
        apiStates.apiPostFailed429
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
