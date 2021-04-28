import axios from 'axios';
import defaultOptions from './defaultOptions';

let _configuration = null;
let _axiosInstance = null;

/**
    * Get a resource
    * @param {string} resource - The resource to post (URL)
    * @return {object} - Returns data from response
*/
const get = async resource => {
    try {
        const response = await _axiosInstance.get(resource);

        return response.data;
    } catch (error) {
        if (_configuration.errorCallback) {
            _configuration.errorCallback(error, resource);
        }

        throw error;
    }
};

/**
    * Post a resource
    * @param {string} resource - The resource to post (URL)
    * @param {object} body - The request body, contents of the resource
    * @param {object} headers - Any additional request headers you want to post
    * @return {object} - Returns data from response
*/
const post = async (resource, body, headers = {}) => {
    try {
        const config = {
            headers
        };

        const response = await _axiosInstance.post(resource, body, config);

        return response.data;
    } catch (error) {
        if (_configuration.errorCallback) {
            _configuration.errorCallback(error, resource);
        }

        throw error;
    }
};

/**
    * Create a httpClient
    * @param {object} options - Any options to override - refer to documentation for options
    * @return {object} - Returns an object with restful request methods
*/
export default options => {
    // Merge default configuration with overrides
    _configuration = {
        ...defaultOptions,
        ...options
    };

    _axiosInstance = axios.create({
        baseURL: _configuration.baseUrl,
        timeout: _configuration.timeout
    });

    return {
        get,
        post,
        readConfiguration: () => _configuration
    };
};
