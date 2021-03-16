/* eslint camelcase: ["error", { allow: [
    "bs_local",
    "os_version",
    "browser_version"
] }]
*/

const configuration = require('../configuration/browserstack').default();

let browserstackName = `Local - ${process.env.BROWSERSTACK_USERNAME} ${new Date().toLocaleTimeString()}`;

/**
 * Check if we're running on a TeamCity agent,
 * so we can set the Browserstack build name.
 */

exports.localCapabilities = () => ({
    maxInstances: 1,
    os: configuration.capabilities.os,
    os_version: configuration.capabilities.osVersion,
    browserName: configuration.capabilities.browserName,
    browser_version: configuration.capabilities.browserVersion,
    device: configuration.capabilities.device,
    project: 'Fozzie-Components',
    build: browserstackName,
    'browserstack.networkLogs': true
});

exports.browserStackCapabilities = () => {
    return exports.localCapabilities();
};
