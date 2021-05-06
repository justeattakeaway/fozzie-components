import createClient from './createClient';

import {
    createMockClient,
    setupMockResponse
} from './mockFactory';

import httpVerbs from './httpVerbs';

/**
 *  @class mockFactory
 *  @type {Object}
 *  @property {function} createMockClient Create a new HTTP client which supports mocking of the underlying connection
 *  @property {object} setupMockResponse Setup a fixed response for a HTTP request
 */
const mockFactory = {
    createMockClient,
    setupMockResponse
};

/**
 *  @class httpModule
 *  @type {Object}
 *  @property {function} createClient Create a new HTTP client - accepts options.
 *  @property {mockFactory} mockFactory Exposes functions to setup mocking of the underlying HTTP connection
 *  @property {object} httpVerbs Exposes HTTP Verbs as constants
 */
const httpModule = {
    createClient,
    mockFactory,
    httpVerbs
};

/**
 * @returns {httpModule} Module for setting up HTTP connections
 */
export default httpModule;
