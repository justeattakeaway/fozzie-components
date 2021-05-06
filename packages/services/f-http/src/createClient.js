import axios from 'axios';
import defaultOptions from './defaultOptions';
import handleError from './errorHandler';
import configBuilder from './configBuilder';
import setAuthorisationToken from './authorisationHandler';

let _configuration = null;
let _axiosInstance = null;

/**
 * Get a resource
 * @param {string} resource - The resource to get (URL)
 * @param {object} headers - Any additional request headers you want to provide
 * @return {object} - Returns data from response
 */
const getResource = async (resource, headers = {}) => {
    try {
        const response = await _axiosInstance.get(resource, configBuilder(headers));

        return response.data;
    } catch (error) {
        return handleError(error, _configuration.errorCallback);
    }
};

/**
 * Post a resource
 * @param {string} resource - The resource to post (URL)
 * @param {object} body - The request body, contents of the resource
 * @param {object} headers - Any additional request headers you want to provide
 * @return {object} - Returns data from response
 */
const postResource = async (resource, body, headers = {}) => {
    try {
        const response = await _axiosInstance.post(resource, body, configBuilder(headers));

        return response.data;
    } catch (error) {
        return handleError(error, _configuration.errorCallback);
    }
};

/**
 * Patch a resource
 * @param {string} resource - The resource to patch (URL)
 * @param {object} body - The request body, contents of the resource
 * @param {object} headers - Any additional request headers you want to provide
 * @return {object} - Returns data from response
 */
const patchResource = async (resource, body, headers = {}) => {
    try {
        const response = await _axiosInstance.patch(resource, body, configBuilder(headers));

        return response.data;
    } catch (error) {
        return handleError(error, _configuration.errorCallback);
    }
};

/**
 * Put a resource
 * @param {string} resource - The resource to put (URL)
 * @param {object} body - The request body, contents of the resource
 * @param {object} headers - Any additional request headers you want to provide
 * @return {object} - Returns data from response
 */
const putResource = async (resource, body, headers = {}) => {
    try {
        const response = await _axiosInstance.put(resource, body, configBuilder(headers));

        return response.data;
    } catch (error) {
        return handleError(error, _configuration.errorCallback);
    }
};

/**
 * Delete a resource
 * @param {string} resource - The resource to delete (URL)
 * @param {object} headers - Any additional request headers you want to provide
 * @return {object} - Returns data from response
 */
const deleteResource = async (resource, headers = {}) => {
    try {
        const response = await _axiosInstance.delete(resource, configBuilder(headers));

        return response.data;
    } catch (error) {
        return handleError(error, _configuration.errorCallback);
    }
};

/**
 * Create a httpClient
 * @param {object} options - Any options to override - refer to documentation for options
 * @return {object} - Returns an object with restful request methods
 */
export default (options = {}) => {
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
