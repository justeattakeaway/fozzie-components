/* global browser */
const axios = require('axios');
const { mockOptionsResponse } = require('./optionsResponse.mock');

const emailInUseResponse = {
    faultId: '5bdb442d-7e66-4ca0-aaed-41101d8e8b90',
    traceId: '80000144-0000-fa00-b63f-84710c7967bb',
    errors: [{
        description: 'The specified email already exists',
        errorCode: '409'
    }]
};

const getMockMapping = (tenant) => {
    return {
        request: {
            method: 'POST',
            url: `/consumers/${tenant}`
        },
        response: {
            status: 409,
            jsonBody: emailInUseResponse
        }
    }
}

/**
 * @description
 * Mocks the POST AccountAPI /consumers/${tenant} endpoint with a 409 (Conflict) response.
 * @param {String} tenant The tenant being used tested
 */
exports.mockEmailInUseRegistrationResponse = (tenant) => {
    mockOptionsResponse(tenant);

    const mockMapping = JSON.stringify(getMockMapping(tenant));

    browser.call(async () => {
        await axios.post('http://127.0.0.1:8181/__admin/mappings/new', mockMapping);
    });
};
