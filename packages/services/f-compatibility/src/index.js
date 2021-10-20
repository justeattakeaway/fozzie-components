/**
* @overview Service to check browser compatibilities and warn users with incompatible browsers
*
* @module f-compatibility
*/

import Bowser from 'bowser';
import { UNSUPPORTED_BROWSERS, BROWSER_DATA } from './constants';

/**
 *  @class compatibility
 *  @type {Object}
 */
const compatibility = {
    method: () => {
        const browser = Bowser.getParser(window.navigator.userAgent);
        const isUnsupported = browser.satisfies(UNSUPPORTED_BROWSERS);
        if (isUnsupported) {
            console.log(BROWSER_DATA);
        }
    }
};

/**
 * @returns {compatibility} Module for checking browser compatibility
 */
export default compatibility;
