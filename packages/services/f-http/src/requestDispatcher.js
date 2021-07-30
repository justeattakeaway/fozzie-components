import handleError from './errorHandler';
import configBuilder from './configBuilder';

export default class StatClient {
    constructor (axiosInstance, configuration) {
        this.axiosInstance = axiosInstance;
        this.configuration = configuration;
    }

    /**
     * Send a request without a request body
     * @param {string} method - The HTTP Method of the request (get or delete)
     * @param {string} resource - The resource to get (URL)
     * @param {object} headers - Any additional request headers you want to provide
     * @return {object} - Returns data from response
     */
    async sendRequest (method, resource, headers = {}) {
        try {
            const response = await this.axiosInstance[method.toLowerCase()](resource, configBuilder(headers));

            return {
                statusCode: response.status,
                data: response.data
            };
        } catch (error) {
            return handleError(error, this.configuration.errorCallback);
        }
    }

    /**
     * Send a request with a request body
     * @param {string} method - The HTTP Method of the request (post, put, patch)
     * @param {string} resource - The resource to get (URL)
     * @param {object} body - The request body, contents of the resource
     * @param {object} headers - Any additional request headers you want to provide
     * @return {object} - Returns data from response
     */
    async sendRequestWithBody (method, resource, body, headers = {}) {
        try {
            const response = await this.axiosInstance[method.toLowerCase()](resource, body, configBuilder(headers));

            return {
                statusCode: response.status,
                data: response.data
            };
        } catch (error) {
            return handleError(error, this.configuration.errorCallback);
        }
    }
}
