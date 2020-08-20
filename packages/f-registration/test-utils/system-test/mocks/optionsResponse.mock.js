/* global browser */
const axios = require('axios');

const getMockMapping = (tenant) => {
    return {
        request: {
            method: 'OPTIONS',
            url: `/consumers/${tenant}`
        },
        response: {
            status: 200
        }
    };
}

/**
 * @description
 * Mocks the OPTIONS AccountAPI /consumers/${tenant} endpoint with a 200 (OK) response.
 * @param {String} tenant The tenant being used tested
 */
exports.mockOptionsResponse = (tenant) => {

    const mockMapping = JSON.stringify(getMockMapping(tenant));

    browser.call(async () => {
        await axios.post('http://127.0.0.1:8181/__admin/mappings/new', mockMapping);
    });
};
