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

export {
    COUNTRY_INFO,
    DEFAULT_APP_ID,
    DEFAULT_APP_TYPE,
    IDENTITY_PROVIDERS,
    GRANT_TYPES
};
