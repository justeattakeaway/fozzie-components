/* global browser */
const { mockOptionsResponse } = require('./optionsResponse.mock');
const axios = require('axios');

const getMockMapping = (tenant) => {
    return {
        request: {
            method: 'POST',
            url: `/consumers/${tenant}`
        },
        response: {
            status: 201
        }
    }
}

/**
 * @description
 * Mocks the POST AccountAPI /consumers/${tenant} endpoint with a 201 (Created) response.
 * @param {String} tenant The tenant being used tested
 */
exports.mockSuccessfulRegistrationResponse = (tenant) => {

    mockOptionsResponse(tenant);
    const mockMapping = JSON.stringify(getMockMapping(tenant));

    console.log(mockMapping);

    browser.call(async () => {
        await axios.post('http://127.0.0.1:8181/__admin/mappings/new', mockMapping);
    });
};
