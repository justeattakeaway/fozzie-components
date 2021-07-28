import CreateClient from './createClient';
import MockFactory from './mockFactory';
import httpVerbs from './httpVerbs';

/**
 *  @class httpModule
 *  @type {Object}
 *  @property {function} createClient Create a new HTTP client - accepts options.
 *  @property {mockFactory} mockFactory Exposes functions to setup mocking of the underlying HTTP connection
 *  @property {object} httpVerbs Exposes HTTP Verbs as constants
 */
const httpModule = {
    CreateClient,
    MockFactory,
    httpVerbs
};

/**
 * @returns {httpModule} Module for setting up HTTP connections
 */
export default httpModule;
