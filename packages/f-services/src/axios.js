import axios from 'axios';
import {
    forEach,
    isPlainObject,
    isArray,
    camelCase,
    words,
    upperFirst
} from 'lodash-es';

/**
 * Wrapper for navigator.connection and its Firefox/Safari implementations
 */
const getNetworkDetails = () => {
    if (typeof navigator === 'undefined') return null;

    return navigator.connection
        || navigator.mozConnection
        || navigator.webkitConnection
        || null;
};

/**
 * Returns a timeout in milliseconds based on the current connection speed. Slower connections will have longer timeouts.
 */
const getTimeout = () => {
    const connection = getNetworkDetails();
    const downlink = connection?.downlink;

    const speedSlow2g = 0.25;
    const speed2g = 0.45;
    const speed3g = 0.75;
    const speed4g = 4;

    switch (true) {
        case (downlink < speedSlow2g):
            return 25000;
        case (downlink < speed2g):
            return 20000;
        case (downlink < speed3g):
            return 15000;
        case (downlink < speed4g):
            return 10000;
        case (downlink >= speed4g):
            return 5000;
        default:
            return 10000;
    }
};

/**
 * Converts an objects' property keys into alternate casing using given transformation function.
 *
 * @param {Object} data
 * @param {Function} alternateCaser
 * @returns {Object}
 */
const objectToAlternateCasing = (data, alternateCaser) => {
    const alternateCasedObject = {};
    const alternateCasedArray = [];

    forEach(data, (dataValue, key) => {
        let val = dataValue;

        // checks that a value is a plain object or an array - for recursive key conversion
        if (isPlainObject(val) || isArray(val)) {
            // recursively update keys of any values that are also objects
            val = objectToAlternateCasing(val, alternateCaser);
        }

        if (isArray(data)) {
            alternateCasedArray.push(val);
        } else {
            alternateCasedObject[alternateCaser(key)] = val;
        }
    });

    if (isArray(data)) {
        return alternateCasedArray;
    }

    return alternateCasedObject;
};

/**
 * Converts an object's property names to camelCase
 *
 * @param {Object} data - Object to have its property names converted
 */
const objectToCamelCase = data => objectToAlternateCasing(data, camelCase);

/**
 * Converts a string to Upper-Kebab-Case. Can be used for request headers.
 *
 * @param {string} toConvert
 * @returns {string}
 */
const upperKebabCase = toConvert => words(toConvert)
    .map(upperFirst)
    .join('-');

/**
 * Attach interceptors to the axios client to record response time from an API
 *
 * @param {AxiosInstance} axiosInstance
 * @param {Function} callback - Function to be invoked, takes the [axios response object](https://github.com/axios/axios#response-schema) as a parameter. You should publish your stats (i.e., response times) using this callback.
 */
const setupResponseTimeRecording = ({ interceptors }, callback) => {
    if (!callback || typeof callback !== 'function') return;

    interceptors.request.use(config => {
        config.meta = config.meta || {};
        config.meta.requestStartedAt = new Date().getTime();
        return config;
    });

    interceptors.response.use(response => {
        const timeTakenMs = new Date().getTime() - response.config.meta.requestStartedAt;
        response.responseTimeMs = timeTakenMs; // Extend the default response schema

        callback(response);
        return response;
    });
};

/**
 * Create an axios client.
 *
 * @param {Object} options
 */
const createClient = ({
    baseURL = '',
    headers,
    headerTransform,
    config,
    responseCallback = false
} = {}) => {
    const instance = axios.create({
        baseURL,
        headers: headerTransform
            ? headerTransform(headers)
            : objectToAlternateCasing(headers, upperKebabCase),
        timeout: getTimeout(),
        ...config
    });

    setupResponseTimeRecording(instance, responseCallback);

    return instance;
};

/**
 * Wrapper for createClient that transforms response objects' property names to camelCase.
 *
 * @param {string} options
 */
const createCamelCaseClient = ({
    baseURL,
    headers,
    headerTransform
} = {
    baseURL: ''
}) => createClient({
    baseURL,
    headers,
    headerTransform,
    config: {
        transformResponse: [
            ...axios.defaults.transformResponse,
            data => objectToCamelCase(data)
        ]
    }
});

export default {
    createClient,
    createCamelCaseClient,
    objectToCamelCase,
    getNetworkDetails,
    setupResponseTimeRecording
};
