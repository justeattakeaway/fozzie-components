import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import httpVerbs from './httpVerbs';

export default class StatClient {
    constructor () {
        this.axiosMockAdapter = new MockAdapter(axios);
    }

    /**
     * Setup a mock response
     * @param {object} url - The HTTP method for the mocked call (IE: GET)
     * @param {object} url - The URL the test will mimic
     * @param {object} requestdata - The request payload if applicable
     * @param {object} statusCode - The status code to return
     * @param {object} data - The data to return
     */
    async setupMockResponse (method, url, requestData, statusCode, data) {
        const supportedFunctions = {
            [httpVerbs.GET]: 'onGet',
            [httpVerbs.POST]: 'onPost',
            [httpVerbs.PUT]: 'onPut',
            [httpVerbs.PATCH]: 'onPatch',
            [httpVerbs.DELETE]: 'onDelete'
        };

        const mockMethod = supportedFunctions[method];

        this.axiosMockAdapter[mockMethod](url, requestData).reply(statusCode, data);
    }
}
