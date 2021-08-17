import jwtDecode from 'jwt-decode';
import SHA256 from 'crypto-js/sha256';
import {
    COUNTRY_INFO,
    DEFAULT_APP_TYPE,
    DEFAULT_APP_ID,
    IDENTITY_PROVIDERS,
    GRANT_TYPES
} from '@/constants';

const getDisplaySize = () => {
    const width = window.innerWidth;

    // Use fozzie for breakpoints?
    if (width > 1280) return 'full-size';
    else if (width > 1025) return 'huge';
    else if (width > 768) return 'wide';
    else if (width > 414) return 'mid';

    return 'narrow';
};

const getOrientation = () => {
    const height = window.innerHeight;
    const width = window.innerWidth;

    return height > width ? 'Portrait' : 'Landscape';
};

const getCookie = (name, req) => {
    if (req && req.headers && req.headers.cookie) {
        const value = `; ${req.headers.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }

    return undefined;
};

const mapAnonymousUserId = (userData, req) => {
    const value = getCookie('je-auser', req);
    if (value) {
        userData['a-UserId'] = value;
    }
};

const mapUserAgent = (platformData, req) => {
    let userAgentString;
    if (typeof (window) !== 'undefined' && navigator) {
        userAgentString = navigator.userAgent;
    } else if (req && req.headers) {
        userAgentString = req.headers['user-agent'];
    }
    if (userAgentString) platformData.userAgent = userAgentString;
};

export const mapServersidePlatformData = (platformData, req) => {
    if (process.env.justEatEnvironment) platformData.environment = process.env.justEatEnvironment;
    if (process.env.FEATURE_VERSION) platformData.version = process.env.FEATURE_VERSION;
    if (process.env.INSTANCE_POSITION) platformData.instancePosition = process.env.INSTANCE_POSITION;

    const userPercent = getCookie('je-user_percentage', req);
    if (userPercent) platformData.jeUserPercentage = userPercent;
};

export const mapServersidePageData = (pageData, res) => {
    if (res.statusCode) pageData.httpStatusCode = res.statusCode;
};

export const mapPlatformData = (platformData, featureName, locale, req) => {
    platformData.name = featureName;
    platformData.appType = DEFAULT_APP_TYPE;
    platformData.applicationId = DEFAULT_APP_ID;
    mapUserAgent(platformData, req);
    platformData.branding = COUNTRY_INFO[locale].brand;
    platformData.country = COUNTRY_INFO[locale].country;
    platformData.language = COUNTRY_INFO[locale].language;
    platformData.currency = COUNTRY_INFO[locale].currency;
};

export const mapUserData = (userData, authToken, req) => {
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

export const mapPageData = (pageData, featureName, pageName, conversationId, requestId) => {
    pageData.group = featureName;
    if (pageName) pageData.name = pageName;
    pageData.isCached = false;
    if (conversationId) pageData.conversationId = conversationId;
    if (requestId) pageData.requestId = requestId;

    if (typeof (window) !== 'undefined') {
        const diplaySize = getDisplaySize();
        if (diplaySize) pageData.display = diplaySize;
        const orientation = getOrientation();
        if (orientation) pageData.orientation = orientation;
    }
};
