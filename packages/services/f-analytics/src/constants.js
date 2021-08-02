const COUNTRY_INFO = {
    'en-GB': {
        language: 'en',
        country: 'uk',
        brand: 'justeat',
        currency: 'gbp'
    },
    'en-IE': {
        language: 'en',
        country: 'ie',
        brand: 'justeat',
        currency: 'eur'
    },
    'it-IT': {
        language: 'it',
        country: 'it',
        brand: 'justeat',
        currency: 'eur'
    },
    'es-ES': {
        language: 'es',
        country: 'es',
        brand: 'justeat',
        currency: 'eur'
    },
    'en-AU': {
        language: 'en',
        country: 'au',
        brand: 'menulog',
        currency: 'aud'
    },
    'en-NZ': {
        language: 'en',
        country: 'nz',
        brand: 'menulog',
        currency: 'nzd'
    }
};

const DEFAULT_APP_ID = 7;
const DEFAULT_APP_TYPE = 'web';

const IDENTITY_PROVIDERS = {
    facebook: 'Facebook',
    google: 'Google',
    idsrv: 'Email',
    otac: 'Guest',
    default: 'Email'
};

const GRANT_TYPES = {
    // eslint-disable-next-line quote-props
    'refresh_token': 'Resume',
    registration: 'Sign up',
    default: 'Login'
};

/**
 * Allows routes to be mapped to feature names:
 *
 * Key: Route name.
 * Value: Feature name.
 *
 * @type {{'account-register': string, checkout: string}}
 *
 */
const MAP_ROUTE_TO_FEATURE_NAME = {
    'account-register': 'global_registration',
    checkout: 'global_checkout'
};

export {
    COUNTRY_INFO,
    DEFAULT_APP_ID,
    DEFAULT_APP_TYPE,
    MAP_ROUTE_TO_FEATURE_NAME,
    IDENTITY_PROVIDERS,
    GRANT_TYPES
};
