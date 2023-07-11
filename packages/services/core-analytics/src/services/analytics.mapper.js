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
 * Returns the current orientation name.
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
 * @return {string} The contents of the cookie
 */
const getCookie = cookieName => {
    const cookies = new Cookies();
    const value = cookies.get(cookieName);

    return value;
};

/**
 * Maps the anonymous User Id to the UserData field, e.g. 'a-UserId'.
 *
 * @return {string} UserId from cookie
 */
const mapAnonymousUserId = cookieName => {
    const value = getCookie(cookieName);
    return value;
};

/**
 * Maps various static/computed variables to the PlatformData.
 *
 * @param {object} platformData - A reference to the current PlatformData instance
 * @param {string} featureName - The name of the feature
 * @param {string} locale - The current locale
 * @return {object} new platformData object
 */
export const mapPlatformData = ({
    platformData, featureName, locale
} = {}) => {
    const mappedPlatformData = {
        ...platformData,
        name: featureName
    };
    mappedPlatformData.appType = DEFAULT_APP_TYPE;
    mappedPlatformData.applicationId = DEFAULT_APP_ID;
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
 * @return {object} new userData object
 */
export const mapUserData = ({ userData, authToken, options } = {}) => {
    const userId = mapAnonymousUserId(options.anonUserCookieName);
    let mappedUserData = {
        ...userData,
        'a-UserId': userId
    };

    if (authToken && options.authTokenType === 'l-je') {
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
 * @param {number} httpStatusCode - The httpStatusCode (only supplied when 200 needs to be overriden)
 * @return {object} new pageData object
 */
export const mapPageData = ({
    pageData,
    pageName,
    httpStatusCode
} = {}) => {
    const conversationId = getCookie('x-je-conversation');
    const orientation = getOrientation();

    const mappedPageData = {
        ...pageData,
        name: pageName || pageData.pageName,
        conversationId: conversationId || pageData.conversationId,
        httpStatusCode: httpStatusCode || pageData.httpStatusCode,
        orientation: orientation || pageData.orientation
    };

    return mappedPageData;
};
