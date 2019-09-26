/**
 * @overview Shared Service
 *
 * @module shared/service
 */

/**
 * Returns the locale in correct case format 'en-GB'
 *
 * @param {locale} string of the current locale.
 * @returns {String}
 */
const transformLocale = locale => `${locale.slice(0, -3)}${locale.slice(locale.lastIndexOf('-')).toUpperCase()}`;

/**
 * Returns the locale for translation localization
 *
 * @param {tenantConfigs} object of localization strings.
 * @param {tenantString} string of the current locale.
 * @param {globalTenant} object of the global localization strings.
 * @returns {String}
 */
const getLocale = (tenantConfigs, tenantString, globalTenant) => {
    let locale = transformLocale(tenantString === '' ? globalTenant?.locale : tenantString);

    // if the locale is either
    // a) not set
    // or b) set to a country code that this component does not recognise
    // it will be set to 'en-GB'
    if (!tenantConfigs[locale]) locale = 'en-GB';

    return locale;
};

/**
 * Returns the theme from the given locale
 *
 * @param {locale} string of the current locale.
 * @returns {String} for the theme toggle
 */
const getTheme = locale => {
    switch (locale) {
        case 'en-AU':
        case 'en-NZ':
            return 'ml';
        default:
            return 'je';
    }
};

export default {
    getLocale,
    getTheme
};
