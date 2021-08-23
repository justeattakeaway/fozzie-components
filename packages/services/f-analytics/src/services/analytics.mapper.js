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
 * @param {object} userData - A reference to the current UserData instance
 * @param {object} req - The `request` context
 */
const mapAnonymousUserId = (userData, req) => {
    const value = getCookie('je-auser', req);
    if (value) {
        userData['a-UserId'] = value;
    }
};

/**
 * Maps the user agent string (if present) to the PlatformData 'userAgent' field
 * Note: if executed clientside then the value will be read from the `window.navigator`
 * otherside it is read from the 'user-agent' header.
 *
 * @param {object} platformData - A reference to the current PlatformData instance
 * @param {object} req - The `request` context
 */
const mapUserAgent = (platformData, req) => {
    let userAgentString;
    if (typeof (window) !== 'undefined' && window.navigator) {
        userAgentString = window.navigator.userAgent;
    } else if (req && req.headers) {
        userAgentString = req.headers['user-agent'];
    }
    if (userAgentString) platformData.userAgent = userAgentString;
};

/**
 * Maps various environment variables (if present); that are only available when executed
 * serverside, to the PlatformData.
 * Also maps the user percentage experiment value (if present) to the PlatformData; again
 * only available serverside due to it's protection.
 * Note: this is stored until the rest of the PlatformData is collated and sent clientside.
 *
 * @param {object} platformData - A reference to the current PlatformData instance
 * @param {object} req - The `request` context
 */
export const mapServersidePlatformData = ({ platformData, req } = {}) => {
    if (process.env.justEatEnvironment) platformData.environment = process.env.justEatEnvironment;
    if (process.env.FEATURE_VERSION) platformData.version = process.env.FEATURE_VERSION;
    if (process.env.INSTANCE_POSITION) platformData.instancePosition = process.env.INSTANCE_POSITION;

    const userPercent = getCookie('je-user_percentage', req);
    if (userPercent) platformData.jeUserPercentage = userPercent;
};

/**
 * Maps various static/computed variables to the PlatformData.
 *
 * @param {object} platformData - A reference to the current PlatformData instance
 * @param {string} featureName - The name of the feature
 * @param {string} locale - The current locale
 * @param {object} req - The `request` context
 */
export const mapPlatformData = ({
    platformData, featureName, locale, req
} = {}) => {
    platformData.name = featureName;
    platformData.appType = DEFAULT_APP_TYPE;
    platformData.applicationId = DEFAULT_APP_ID;
    mapUserAgent(platformData, req);
    platformData.branding = COUNTRY_INFO[locale].brand;
    platformData.country = COUNTRY_INFO[locale].country;
    platformData.language = COUNTRY_INFO[locale].language;
    platformData.currency = COUNTRY_INFO[locale].currency;
};

/**
 * Maps various static/computed variables to the UserData.
 * Note: if the authToken is supplied then this is decoded to reveal
 * various fields of user data.
 *
 * @param {object} userData - A reference to the current UserData instance
 * @param {string} authToken - The current authorisation token
 * @param {object} req - The `request` context
 */
export const mapUserData = ({ userData, authToken, req } = {}) => {
    mapAnonymousUserId(userData, req);
    if (authToken) {
        const tokenData = jwtDecode(authToken);

        userData.authType = tokenData?.is_new_registration ? GRANT_TYPES.registration : (GRANT_TYPES[tokenData?.grant_type] || GRANT_TYPES.default);
        if (tokenData?.email) userData.email = SHA256(tokenData?.email).toString();
        if (tokenData?.global_user_id) userData.globalUserId = tokenData?.global_user_id;
        userData.signinType = tokenData?.role === IDENTITY_PROVIDERS.otac ? (IDENTITY_PROVIDERS.otac || IDENTITY_PROVIDERS[tokenData?.idp]) : IDENTITY_PROVIDERS.default;
        if (tokenData?.created_date) userData.signupDate = tokenData?.created_date;
    }
};

/**
 * Maps various static/computed variables to the PageData.
 *
 * @param {object} pageData - A reference to the current PageData instance
 * @param {string} featureName - The name of the feature
 * @param {string} pageName - The name of the page
 * @param {string} conversationId - The current conversation Id
 * @param {string} requestId - The current request Id
 * @param {number} httpStatusCode - The httpStatusCode (only supplied when 200 needs to be overriden)
 */
export const mapPageData = ({
    pageData,
    featureName,
    pageName,
    conversationId,
    requestId,
    httpStatusCode
} = {}) => {
    pageData.group = featureName;
    if (pageName) pageData.name = pageName;
    pageData.isCached = false;
    if (conversationId) pageData.conversationId = conversationId;
    if (requestId) pageData.requestId = requestId;
    if (httpStatusCode) pageData.httpStatusCode = httpStatusCode;
    const diplaySize = getDisplaySize();
    if (diplaySize) pageData.display = diplaySize;
    const orientation = getOrientation();
    if (orientation) pageData.orientation = orientation;
};
