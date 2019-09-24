/**
 * @overview Shared Service
 *
 * @module shared/service
 */

/**
 * Returns the locale for translation localization
 *
 * @param {tenantConfigs} object of localization strings.
 * @param {tenantString} string of the current locale.
 * @param {globalTenant} object of the global localization strings.
 * @returns {String}
 */
const getLocale = (tenantConfigs, tenantString, globalTenant) => {
    let locale = tenantString || globalTenant?.locale;

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
