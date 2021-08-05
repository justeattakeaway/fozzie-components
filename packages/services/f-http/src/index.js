import CreateClient from './createClient';
import MockFactory from './mockFactory';
import httpVerbs from './httpVerbs';

/**
 *  @class httpModule
 *  @type {Object}
 *  @property {object} CreateClient Create a new HTTP client - accepts options.
 *  @property {object} MockFactory Create a new Mock Factory to fake API responses
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
