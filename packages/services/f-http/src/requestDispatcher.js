import handleError from './errorHandler';
import configBuilder from './configBuilder';

let _configuration = null;
let _axiosInstance = null;

/**
 * Send a request without a request body
 * @param {string} method - The HTTP Method of the request (get or delete)
 * @param {string} resource - The resource to get (URL)
 * @param {object} headers - Any additional request headers you want to provide
 * @return {object} - Returns data from response
 */
const sendRequest = async (method, resource, headers = {}) => {
    try {
        const response = await _axiosInstance[method.toLowerCase()](resource, configBuilder(headers));

        return response.data;
    } catch (error) {
        return handleError(error, _configuration.errorCallback);
    }
};

/**
 * Send a request with a request body
 * @param {string} method - The HTTP Method of the request (post, put, patch)
 * @param {string} resource - The resource to get (URL)
 * @param {object} body - The request body, contents of the resource
 * @param {object} headers - Any additional request headers you want to provide
 * @return {object} - Returns data from response
 */
const sendRequestWithBody = async (method, resource, body, headers = {}) => {
    try {
        const response = await _axiosInstance[method.toLowerCase()](resource, body, configBuilder(headers));

        return response.data;
    } catch (error) {
        return handleError(error, _configuration.errorCallback);
    }
};

export default (axiosInstance, configuration) => {
    _axiosInstance = axiosInstance;
    _configuration = configuration;

    return {
        sendRequest,
        sendRequestWithBody
    };
};
