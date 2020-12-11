import { safeParseJson, getCookie } from '../../utils/helpers';

const options = {
    isFullAddressSearchActive: false
};

/**
 * Determines whether the instance is the target of an experiment
 * by inspecting an object serialised to localStorage.
 * @returns {boolean}
 */
function isExperimentTarget () {
    if (!window.localStorage) { return false; }
    const detailsJson = window.localStorage.getItem('je-experiment-details');
    const details = safeParseJson(detailsJson);
    const url = `${window.location.host}${window.location.pathname}`;
    const urlWithoutSlash = url.replace(/\/$/, '');
    return !!details
        && !!details.enabledUrls
        && (details.enabledUrls.indexOf(url) !== -1 || details.enabledUrls.indexOf(urlWithoutSlash) !== -1);
}

/**
 * Determines whether the full address search cookie exists and is set to 'true'.
 * @returns {boolean}
 */
function isFullAddressSearchCookieEnabled () {
    const fullAddressSearchCookie = getCookie('je-full-address-search-enabled');
    return !!fullAddressSearchCookie && fullAddressSearchCookie.toLowerCase() === 'true';
}

/**
 * Check to see if full address search is active or not. We use two checks here:
 *
 * 1. The cookie `je-full-address-search-enabled` is enabled.
 * 2. The local storage value `je-experiment-details` is populated correctly. For example
 * the target url is set.
 *
 * @returns {boolean}
 */
options.isFullAddressSearchEnabled = () => {
    if (!options.isFullAddressSearchActive) {
        options.isFullAddressSearchActive = isFullAddressSearchCookieEnabled() && isExperimentTarget();
    }

    return options.isFullAddressSearchActive;
};

export default options;
