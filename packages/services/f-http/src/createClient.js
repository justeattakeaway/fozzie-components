import axios from 'axios';
import defaultOptions from './defaultOptions';
import setAuthorisationToken from './authorisationHandler';
import httpVerbs from './httpVerbs';
import interceptors from './interceptors';
import requestDispatcher from './requestDispatcher';

let _configuration = null;
let _axiosInstance = null;

let _sendRequest,
    _sendRequestWithBody;

/**
 * Get a resource
 * @param {string} resource - The resource to get (URL)
 * @param {object} headers - Any additional request headers you want to provide
 * @return {object} - Returns data from response
 */
const getResource = async (resource, headers = {}) => _sendRequest(httpVerbs.GET, resource, headers);

/**
 * Post a resource
 * @param {string} resource - The resource to post (URL)
 * @param {object} body - The request body, contents of the resource
 * @param {object} headers - Any additional request headers you want to provide
 * @return {object} - Returns data from response
 */
const postResource = async (resource, body, headers = {}) => _sendRequestWithBody(httpVerbs.POST, resource, body, headers);

/**
 * Patch a resource
 * @param {string} resource - The resource to patch (URL)
 * @param {object} body - The request body, contents of the resource
 * @param {object} headers - Any additional request headers you want to provide
 * @return {object} - Returns data from response
 */
const patchResource = async (resource, body, headers = {}) => _sendRequestWithBody(httpVerbs.PATCH, resource, body, headers);

/**
 * Put a resource
 * @param {string} resource - The resource to put (URL)
 * @param {object} body - The request body, contents of the resource
 * @param {object} headers - Any additional request headers you want to provide
 * @return {object} - Returns data from response
 */
const putResource = async (resource, body, headers = {}) => _sendRequestWithBody(httpVerbs.PUT, resource, body, headers);

/**
 * Delete a resource
 * @param {string} resource - The resource to delete (URL)
 * @param {object} headers - Any additional request headers you want to provide
 * @return {object} - Returns data from response
 */
const deleteResource = async (resource, headers = {}) => _sendRequest(httpVerbs.DELETE, resource, headers);

/**
 * Create a httpClient
 * @param {object} options - Any options to override - refer to documentation for options
 * @return {object} - Returns an object with restful request methods
 */
export default (options = {}, statsClient = null) => {
    // Merge default configuration with overrides
    _configuration = {
        ...defaultOptions,
        ...options
    };

    _axiosInstance = axios.create({
        baseURL: _configuration.baseUrl,
        timeout: _configuration.timeout,
        headers: {
            'Content-Type': _configuration.contentType
        }
    });

    if (statsClient) {
        // Only add interceptors when capturing statistics
        interceptors.captureResponseStatistics(_axiosInstance, statsClient);
    }

    const requestDispatchMethods = requestDispatcher(_axiosInstance, _configuration);
    _sendRequest = requestDispatchMethods.sendRequest;
    _sendRequestWithBody = requestDispatchMethods.sendRequestWithBody;

    return {
        get: getResource,
        post: postResource,
        patch: patchResource,
        put: putResource,
        delete: deleteResource,
        setAuthorisationToken,
        readConfiguration: () => _configuration
    };
};
