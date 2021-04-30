import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import createClient from '../createClient';
import httpVerbs from '../constants/httpVerbs';

/**
    * Create a httpClient with mocked responses
    * @param {object} url - The HTTP method for the mocked call (IE: GET)
    * @param {object} url - The URL the test will mimic
    * @param {object} requestdata - The request payload if applicable
    * @param {object} statusCode - The status code to return
    * @param {object} data - The data to return
    * @return {object} - Returns an object with mocked restful request methods
*/
export default (method, url, requestData, statusCode, data = {}) => {
    const axiosMock = new MockAdapter(axios);

    switch (method) {
        case httpVerbs.METHOD_GET:
            axiosMock.onGet(url, requestData).reply(statusCode, data);
            break;

        case httpVerbs.METHOD_POST:
            axiosMock.onPost(url, requestData).reply(statusCode, data);
            break;

        default:
            throw new Error('Method not provided');
    }

    const httpClient = createClient();

    return {
        get: httpClient.get,
        post: httpClient.post
    };
};
