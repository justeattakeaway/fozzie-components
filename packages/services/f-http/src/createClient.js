import axios from 'axios';
import defaultOptions from './defaultOptions';
import setAuthorisationToken from './authorisationHandler';
import httpVerbs from './httpVerbs';
import interceptors from './interceptors';
import RequestDispatcher from './requestDispatcher';

/**
 * Create a httpClient
 * @param {object} options - Any options to override - refer to documentation for options
 * @return {object} - Returns an object with restful request methods
 */
export default class StatClient {
    constructor (options = {}, statsClient = null) {
        // Merge default configuration with overrides
        this.configuration = {
            ...defaultOptions,
            ...options
        };

        this.axiosInstance = axios.create({
            baseURL: this.configuration.baseUrl,
            timeout: this.configuration.timeout,
            headers: {
                'Content-Type': this.configuration.contentType
            }
        });

        if (statsClient) {
            // Only add interceptors when capturing statistics
            interceptors.captureResponseStatistics(this.axiosInstance, statsClient);
        }

        const requestDispatchMethods = new RequestDispatcher(this.axiosInstance, this.configuration);
        this.sendRequest = requestDispatchMethods.sendRequest;
        this.sendRequestWithBody = requestDispatchMethods.sendRequestWithBody;
        this.setAuthorisationToken = setAuthorisationToken;
    }

    /**
     * Get a resource
     * @param {string} resource - The resource to get (URL)
     * @param {object} headers - Any additional request headers you want to provide
     * @return {object} - Returns data from response
     */
    async get (resource, headers = {}) {
        return this.sendRequest(httpVerbs.GET, resource, headers);
    }

    /**
     * Post a resource
     * @param {string} resource - The resource to post (URL)
     * @param {object} body - The request body, contents of the resource
     * @param {object} headers - Any additional request headers you want to provide
     * @return {object} - Returns data from response
     */
    async post (resource, body, headers = {}) {
        return this.sendRequestWithBody(httpVerbs.POST, resource, body, headers);
    }

    /**
     * Patch a resource
     * @param {string} resource - The resource to patch (URL)
     * @param {object} body - The request body, contents of the resource
     * @param {object} headers - Any additional request headers you want to provide
     * @return {object} - Returns data from response
     */
    async patch (resource, body, headers = {}) {
        return this.sendRequestWithBody(httpVerbs.PATCH, resource, body, headers);
    }

    /**
     * Put a resource
     * @param {string} resource - The resource to put (URL)
     * @param {object} body - The request body, contents of the resource
     * @param {object} headers - Any additional request headers you want to provide
     * @return {object} - Returns data from response
     */
    async put (resource, body, headers = {}) {
        return this.sendRequestWithBody(httpVerbs.PUT, resource, body, headers);
    }

    /**
     * Delete a resource
     * @param {string} resource - The resource to delete (URL)
     * @param {object} headers - Any additional request headers you want to provide
     * @return {object} - Returns data from response
     */
    async delete (resource, headers = {}) {
        this.sendRequest(httpVerbs.DELETE, resource, headers);
    }

    setAuthorisationToken (authorisationToken) {
        this.setAuthorisationToken(authorisationToken);
    }

    readConfiguration () {
        return this.configuration;
    }
}
