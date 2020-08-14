import axios from 'axios';

import {
    forEach,
    isPlainObject,
    isArray,
    camelCase,
    words,
    upperFirst
} from 'lodash-es';

import setupResponseTimeRecording from './responseTimes';

/**
 * Wrapper for navigator.connection and its Firefox/Safari implementations
 */
const getNetworkDetails = () => navigator.connection
        || navigator.mozConnection
        || navigator.webkitConnection;

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
 * Create an axios client.
 *
 * @param {Object} options
 */
const createClient = ({
    baseURL = '',
    headers,
    config,
    recordResponseTimes = false
} = {}) => {
    const instance = axios.create({
        baseURL,
        headers: objectToAlternateCasing(headers, upperKebabCase),
        timeout: getTimeout(),
        ...config
    });

    if (recordResponseTimes) {
        setupResponseTimeRecording(instance);
    }

    return instance;
};

/**
 * Wrapper for createClient that transforms response objects' property names to camelCase.
 *
 * @param {string} options
 */
const createCamelCaseClient = ({
    baseURL,
    headers
} = {
    baseURL: ''
}) => createClient({
    baseURL,
    headers,
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
    getNetworkDetails
};
