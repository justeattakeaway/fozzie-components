import axios from 'axios';

import {
    forEach,
    isPlainObject,
    isArray,
    camelCase,
    words,
    upperFirst
} from 'lodash-es';

import {
    Histogram
} from 'prom-client';

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
 * Defines a histogram container for prometheus recordings
 *
 */
const responseHistogram = new Histogram({
    name: 'dependency_response_time',
    help: 'Response times from an API dependency in milliseconds',
    labelNames: ['status_code', 'path', 'method'],
    buckets: [1, 5, 10, 50, 100, 500, 1000]
});

/**
 * Record dependency response times with prometheus
 *
 * @param {object} responseObject
 */
const recordPrometheusStats = responseObject => {
    const finishLabels = {
        method: responseObject.method,
        path: responseObject.url,
        status_code: responseObject.statusCode // eslint-disable-line camelcase
    };

    responseHistogram.observe(finishLabels, responseObject.responseTimeMs);
};

/**
 * Attach interceptors to the axios client to record response time from an API
 *
 * @param {object} axiosInstance
 */
const setupResponseTimeRecording = axiosInstance => {
    axiosInstance.interceptors.request.use(config => {
        config.meta = config.meta || {};
        config.meta.requestStartedAt = new Date().getTime();
        return config;
    });

    axiosInstance.interceptors.response.use(response => {
        const timeTakenMs = new Date().getTime() - response.config.meta.requestStartedAt;

        if (process.env.NODE_ENV === 'development') {
            console.log(`Executed (${response.config.url}) in ${timeTakenMs} ms`);
        }

        response.responseTimeMs = timeTakenMs;

        recordPrometheusStats(response);

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
