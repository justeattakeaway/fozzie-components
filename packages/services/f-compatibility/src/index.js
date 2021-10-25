/**
* @overview Service to check browser compatibilities and warn users with incompatible browsers
*
* @module f-compatibility
*/

import { UNSUPPORTED_BROWSERS, BROWSER_DATA } from './constants';

const Bowser = require('bowser/bundled');

/* eslint-disable func-names */

/**
 *  @function attachEvents
 */
const attachEvents = function () {
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', function () {
        const parent = this.parentNode;
        parent.innerHTML = '';
        parent.removeNode();
    });
};

/**
 *  @function buildBanner
 */
const buildBanner = function (title, message) {
    const heading = document.createElement('h2');
    heading.innerText = title;
    const content = document.createElement('p');
    content.innerText = message;
    const contentContainer = document.createElement('div');
    contentContainer.setAttribute('style', 'font-family:JetSansDigital,Arial,sans-serif;left:35%;top:15%;width:30%;text-align:center;position:absolute;z-index:9000;background-color:white;border-radius:16px;box-shadow: 0px 3px 4px 0px rgba(0,0,0,0.12);padding:24px;');
    contentContainer.appendChild(heading);
    contentContainer.appendChild(content);
    const overlay = document.createElement('div');
    overlay.setAttribute('style', 'background-color:rgba(0,0,0,.5);bottom:0px;left:0px;position:fixed;right:0px;top:0px;z-index:9000;');
    overlay.innerHTML = '<svg id="closeButton" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" style="position:absolute;right:16px;top:16px;z-index:9000;height:32px;width:32px;padding:0;border:1px solid transparent;border-radius:50%;background-color:#fff;cursor:pointer;"><path fill-rule="evenodd" d="M 13.3 0.7 a 1 1 0 0 0 -1.4 0 L 7 5.6 L 2.1 0.7 A 1 1 0 1 0 0.7 2.1 L 5.6 7 L 0.7 11.9 a 1 1 0 1 0 1.4 1.4 L 7 8.4 l 4.9 4.9 a 1 1 0 1 0 1.4 -1.4 L 8.4 7 l 4.9 -4.9 c 0.4 -0.4 0.4 -1 0 -1.4 Z" /></svg>';
    overlay.appendChild(contentContainer);
    const bodyTag = document.getElementsByTagName('body');
    bodyTag[0].appendChild(overlay);
    attachEvents();
};

/**
 *  @function unsupportedBrowserAction
 */
const unsupportedBrowserAction = function (unsupportedBrowser) {
    const browserData = BROWSER_DATA[unsupportedBrowser];
    if (browserData.displayBanner) {
        const tenant = document.getElementsByTagName('html')[0].lang;
        buildBanner(browserData.tenants[tenant].title, browserData.tenants[tenant].message);
    }
};

/**
 *  @function compatibility
 */
const compatibility = function () {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const unsupportedBrowsers = Object.keys(UNSUPPORTED_BROWSERS);
    for (let i = 0; i < unsupportedBrowsers.length; i++) {
        const browserToTest = {};
        browserToTest[unsupportedBrowsers[i]] = UNSUPPORTED_BROWSERS[unsupportedBrowsers[i]];
        if (browser.satisfies(browserToTest)) {
            unsupportedBrowserAction(unsupportedBrowsers[i]);
            break;
        }
    }
};

/**
 * @returns {compatibility} function for checking browser compatibility
 */
export default compatibility;
