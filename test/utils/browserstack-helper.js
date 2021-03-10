/* eslint camelcase: ["error", { allow: [
    "bs_local",
    "os_version",
    "browser_version"
] }]
*/

const configuration = require('../configuration/browserstack').default();

const CIRCLE_CI = process.env.CIRCLECI;
let browserstackName = `Local - ${new Date().toLocaleTimeString()}`;

/**
 * Check if we're running on a TeamCity agent,
 * so we can set the Browserstack build name.
 */

if (CIRCLE_CI) {
    const buildNumber = process.env.BUILD_NUMBER;

    browserstackName = `CircleCI - ${buildNumber}`;
}

exports.circleCICapabilities = () => ({
    os: process.env.BROWSERSTACK_OS,
    os_version: process.env.BROWSERSTACK_VERSION,
    browserName: process.env.BROWSERSTACK_BROWSER_NAME,
    browser_version: process.env.BROWSERSTACK_BROWSER_VERSION,
    device: process.env.BROWSERSTACK_DEVICE,
    project: 'Fozzie-Components',
    build: browserstackName,
    'browserstack.networkLogs': true
});

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
    if (CIRCLE_CI) {
        return exports.circleCICapabilities();
    }
    console.log(exports.localCapabilities());
    return exports.localCapabilities();
};
