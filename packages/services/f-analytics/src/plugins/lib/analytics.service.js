import jwtDecode from 'jwt-decode';
import SHA256 from 'crypto-js/sha256';
import {
    PUSH_PLATFORM_DATA,
    PUSH_USER_DATA,
    PUSH_EVENT
} from '../../store/mutation-types';
import {
    COUNTRY_INFO,
    DEFAULT_APP_TYPE,
    DEFAULT_APP_ID,
    IDENTITY_PROVIDERS,
    GRANT_TYPES
} from '../../constants';

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
    userData['a-UserId'] = undefined; // TODO - remove if `undefined` can be the default rather than currently `' '`
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

export default class AnalyticService {
    constructor (store, req, options) {
        this.store = store;
        this.req = req;
        this.namespace = options.namespace;
        this.featureName = options.featureName;
        this.locale = options.locale;
    }

    pushPlatformData () {
        const platformData = { ...this.store.state[`${this.namespace}`].platformData };

        platformData.name = this.featureName;
        platformData.appType = DEFAULT_APP_TYPE;
        platformData.applicationId = DEFAULT_APP_ID;
        mapUserAgent(platformData, this.req);
        platformData.branding = COUNTRY_INFO[this.locale].brand;
        platformData.country = COUNTRY_INFO[this.locale].country;
        platformData.language = COUNTRY_INFO[this.locale].language;
        platformData.currency = COUNTRY_INFO[this.locale].currency;

        this.store.dispatch(`${this.namespace}/${PUSH_PLATFORM_DATA}`, platformData);

        return platformData;
    }

    pushUserData (authToken) {
        const userData = { ...this.store.state[`${this.namespace}`].userData };

        mapAnonymousUserId(userData, this.req);

        if (authToken) {
            const tokenData = jwtDecode(authToken);

            userData.authType = tokenData?.is_new_registration ? GRANT_TYPES.registration : GRANT_TYPES[tokenData?.grant_type] || GRANT_TYPES.default;
            if (tokenData?.email) userData.email = SHA256(tokenData?.email).toString();
            if (tokenData?.global_user_id) userData.globalUserId = tokenData?.global_user_id;
            userData.signinType = tokenData?.role === IDENTITY_PROVIDERS.otac ? IDENTITY_PROVIDERS.otac || IDENTITY_PROVIDERS[tokenData?.idp] : IDENTITY_PROVIDERS.default;
            if (tokenData?.created_date) userData.signupDate = tokenData?.created_date;
        }

        this.store.dispatch(`${this.namespace}/${PUSH_USER_DATA}`, userData);

        return userData;
    }

    pushEvent (event) {
        this.store.dispatch(`${this.namespace}/${PUSH_EVENT}`, event);

        return event;
    }
}

