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
    const locale = tenantString === '' ? globalTenant?.locale : tenantString;

    // makes sure the locale is the same format as the tenants - 'en-GB'
    let transformedLocale = `${locale.slice(0, -3)}${locale.slice(locale.lastIndexOf('-')).toUpperCase()}`;

    // if the locale is either
    // a) not set
    // or b) set to a country code that this component does not recognise
    // it will be set to 'en-GB'
    if (!tenantConfigs[transformedLocale]) transformedLocale = 'en-GB';

    return transformedLocale;
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
