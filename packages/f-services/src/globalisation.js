/**
 * Default locale value when locale is unavailable.
 * @type {string}
 */
const DEFAULT_LOCALE = 'en-GB';

/**
 * Returns the locale for translation localisation
 *
 * @param tenantConfigs {object} of localisation strings.
 * @param tenantString {string} of the current locale.
 * @param globalTenant {object} of the global localisation strings.
 * @param [globalTenant.locale] {string} of the global localisation locale.
 * @returns {string}
 */
export const getLocale = (tenantConfigs, tenantString, globalTenant) => {
    const locale = tenantString || globalTenant?.locale;
    return tenantConfigs[locale] ? locale : DEFAULT_LOCALE;
};

/**
 * Returns the theme from the given locale
 *
 * @param locale {string} of the current locale.
 * @returns {string} for the theme toggle
 */
export const getTheme = locale => {
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
