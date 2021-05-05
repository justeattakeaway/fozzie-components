import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import createClient from './createClient';
import httpVerbs from './httpVerbs';

let _axiosMockAdapter;

/**
 * Setup a mock response
 * @param {object} url - The HTTP method for the mocked call (IE: GET)
 * @param {object} url - The URL the test will mimic
 * @param {object} requestdata - The request payload if applicable
 * @param {object} statusCode - The status code to return
 * @param {object} data - The data to return
 */
const setupMockResponse = async (method, url, requestData, statusCode, data) => {
    if (!_axiosMockAdapter) _axiosMockAdapter = new MockAdapter(axios);

    switch (method) {
        case httpVerbs.METHOD_GET:
            _axiosMockAdapter.onGet(url, requestData).reply(statusCode, data);
            break;

        case httpVerbs.METHOD_POST:
            _axiosMockAdapter.onPost(url, requestData).reply(statusCode, data);
            break;

        default:
            throw new Error('Method not provided');
    }
};

/**
 * Create a httpClient with mocked responses
 * @param {object} options - Any options to override - refer to documentation for options
 * @return {object} - Returns an object with mocked restful request methods
 */
const createMockClient = (options = {}) => createClient(options);

export {
    setupMockResponse,
    createMockClient
};
