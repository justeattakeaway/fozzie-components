import jwtDecode from 'jwt-decode';
import SHA256 from 'crypto-js/sha256';
import Cookies from 'universal-cookie';
import {
    COUNTRY_INFO,
    DEFAULT_APP_TYPE,
    DEFAULT_APP_ID,
    IDENTITY_PROVIDERS,
    GRANT_TYPES
} from '../constants';

/**
 * Returns the current display width name (if clientside).
 *
 * @return {string} The display width name
 */
const getDisplaySize = () => {
    if (typeof (window) !== 'undefined') {
        const width = window.innerWidth;

        // Use fozzie for breakpoints?
        if (width > 1280) return 'full-size';
        else if (width > 1025) return 'huge';
        else if (width > 768) return 'wide';
        else if (width > 414) return 'mid';

        return 'narrow';
    }

    return undefined;
};

/**
 * Returns the current orientation name (if clientside).
 *
 * @return {string} The orientation name
 */
const getOrientation = () => {
    if (typeof (window) !== 'undefined') {
        const height = window.innerHeight;
        const width = window.innerWidth;

        return height > width ? 'Portrait' : 'Landscape';
    }

    return undefined;
};

/**
 * Returns the contents of a cookie
 *
 * @param {string} name - The name of the cookie
 * @param {object} req - The `request` context
 * @return {string} The contents of the cookie
 */
const getCookie = (cookieName, req) => {
    const cookies = req && req.headers && req.headers.cookie ? new Cookies(req.headers.cookie) : new Cookies();
    const value = cookies.get(cookieName);

    return value;
};

/**
 * Maps the anonymous User Id to the UserData 'a-UserId' field.
 *
 * @param {object} req - The `request` context
 * @return {string} UserId from je-auser cookie
 */
const mapAnonymousUserId = req => {
    const value = getCookie('je-auser', req);
    return value;
};

/**
 * Maps the user agent string (if present) to the PlatformData 'userAgent' field
 * Note: if executed clientside then the value will be read from the `window.navigator`
 * otherside it is read from the 'user-agent' header.
 *
 * @param {object} req - The `request` context
 * @return {string} userAgentString
 */
const mapUserAgent = req => {
    let userAgentString;
    if (typeof (window) !== 'undefined' && window.navigator) {
        userAgentString = window.navigator.userAgent;
    } else if (req && req.headers) {
        userAgentString = req.headers['user-agent'];
    }
    return userAgentString;
};

/**
 * Maps various environment variables (if present); that are only available when executed
 * serverside, to the PlatformData.
 * Also maps the user percentage experiment value (if present) to the PlatformData; again
 * only available serverside due to it's protection.
 * Note 1: this is stored until the rest of the PlatformData is collated and sent clientside.
 * Note 2: dot notation on the env vars does not bundle well so using valid alternative [] approach.
 *
 * @param {object} platformData - A reference to the current PlatformData instance
 * @param {object} req - The `request` context
 * @return {object} new platformData object
 */
export const mapServerSidePlatformData = ({ platformData, req } = {}) => {
    const userPercent = getCookie('je-user_percentage', req);

    /* eslint-disable dot-notation */
    const mappedData = {
        ...platformData,
        jeUserPercentage: userPercent || platformData.jeUserPercentage,
        environment: process.env['justEatEnvironment'] || platformData.environment,
        version: process.env['FEATURE_VERSION'] || platformData.version,
        instancePosition: process.env['INSTANCE_POSITION'] || platformData.instancePosition,
        isPilot: process.env['IS_PILOT'] || platformData.isPilot
    };

    return mappedData;
};

/**
 * Maps various static/computed variables to the PlatformData.
 *
 * @param {object} platformData - A reference to the current PlatformData instance
 * @param {string} featureName - The name of the feature
 * @param {string} locale - The current locale
 * @param {object} req - The `request` context
 * @return {object} new platformData object
 */
export const mapPlatformData = ({
    platformData, featureName, locale, req
} = {}) => {
    const userAgent = mapUserAgent(req);
    const mappedPlatformData = {
        ...platformData,
        name: featureName,
        userAgent
    };
    mappedPlatformData.appType = DEFAULT_APP_TYPE;
    mappedPlatformData.applicationId = DEFAULT_APP_ID;
    mappedPlatformData.branding = COUNTRY_INFO[locale].brand;
    mappedPlatformData.country = COUNTRY_INFO[locale].country;
    mappedPlatformData.language = COUNTRY_INFO[locale].language;
    mappedPlatformData.currency = COUNTRY_INFO[locale].currency;

    return mappedPlatformData;
};

/**
 * Maps various static/computed variables to the UserData.
 * Note: if the authToken is supplied then this is decoded to reveal
 * various fields of user data.
 *
 * @param {object} userData - A reference to the current UserData instance
 * @param {string} authToken - The current authorisation token
 * @param {object} req - The `request` context
 * @return {object} new userData object
 */
export const mapUserData = ({ userData, authToken, req } = {}) => {
    const userId = mapAnonymousUserId(req);
    let mappedUserData = {
        ...userData,
        'a-UserId': userId || userData['a-UserId']
    };

    if (authToken) {
        const tokenData = jwtDecode(authToken);
        const authType = tokenData?.is_new_registration ? GRANT_TYPES.registration : (GRANT_TYPES[tokenData?.grant_type] || GRANT_TYPES.default);
        const email = (tokenData?.email) ? SHA256(tokenData?.email).toString() : userData.email;
        const globalUserId = (tokenData?.global_user_id) ? tokenData?.global_user_id : userData.globalUserId;
        const signinType = tokenData?.role === IDENTITY_PROVIDERS.otac ? (IDENTITY_PROVIDERS.otac || IDENTITY_PROVIDERS[tokenData?.idp]) : IDENTITY_PROVIDERS.default;
        const signupDate = (tokenData?.created_date) ? tokenData?.created_date : userData.signupDate;

        mappedUserData = {
            ...mappedUserData,
            authType,
            email,
            globalUserId,
            signinType,
            signupDate
        };
    }

    return mappedUserData;
};

/**
 * Maps various static/computed variables to the PageData.
 *
 * @param {object} pageData - A reference to the current PageData instance
 * @param {string} pageName - The name of the page
 * @param {string} requestId - The current request Id
 * @param {number} httpStatusCode - The httpStatusCode (only supplied when 200 needs to be overriden)
 * @param {object} req - The `request` context
 * @return {object} new pageData object
 */
export const mapPageData = ({
    pageData,
    pageName,
    requestId,
    httpStatusCode,
    req
} = {}) => {
    const conversationId = getCookie('x-je-conversation', req);
    const displaySize = getDisplaySize();
    const orientation = getOrientation();

    const mappedPageData = {
        ...pageData,
        name: pageName || pageData.pageName,
        conversationId: conversationId || pageData.conversationId,
        requestId: requestId || pageData.requestId,
        httpStatusCode: httpStatusCode || pageData.httpStatusCode,
        display: displaySize || pageData.display,
        orientation: orientation || pageData.orientation
    };

    return mappedPageData;
};
