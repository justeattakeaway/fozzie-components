/**
 * Load analytics account based on the account id passed in.
 *
 */
/* eslint-disable */
const loadAnalyticsAccount = () => (function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); const f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? `&l=${l}` : ''; j.async = true; j.src = `//www.googletagmanager.com/gtm.js?id=${i}${dl}`; f.parentNode.insertBefore(j, f);
}(window, document, 'script', 'dataLayer', 'GTM-TMPX9FN'));
/* eslint-enable */

/**
 * Get the country based on the Locale.
 *
 * @param locale
 * @returns {*}
 */
const getCountry = locale => {
    switch (locale) {
        case 'en-GB':
            return 'UK';
        case 'en-IE':
            return 'IE';
        case 'da-DK':
            return 'DK';
        case 'nb-NO':
            return 'NO';
        case 'it-IT':
            return 'IT';
        case 'es-ES':
            return 'ES';
        case 'en-AU':
            return 'AU';
        case 'en-NZ':
            return 'NZ';
        default:
            return 'default';
    }
};

/**
 * Get the theme based on the locale.
 *
 * @param locale
 * @returns {*}
 */
const getTheme = locale => {
    switch (locale) {
        case 'en-AU':
        case 'en-NZ':
            return 'menulog';
        default:
            return 'default';
    }
};

/**
 * Push pageData & platformData to the dataLayer.
 *
 * @param locale
 */
const dataLayerPushPageData = locale => {
    const dataLayer = window.dataLayer || [];

    dataLayer.push({
        pageData: {
            group: 'Error',
            httpStatusCode: 404,
            name: 'Error'
        },
        platformData: {
            appType: 'Web',
            applicationId: 7,
            branding: getTheme(locale),
            country: getCountry(locale),
            language: locale,
            name: 'static_web',
            statusCode: 404,
            version: '1'
        }
    });
};

/**
 * Required for MenuWeb rollout. Can be removed once MenuWeb is out 100%.
 */
const trackMenuWebPageExperiment = () => {
    const dataLayer = window.dataLayer || [];
    const isMenuPage = window.location.pathname.toLowerCase().indexOf('/restaurants-') >= 0;

    if (isMenuPage) {
        const menuWebExperimentValue = (`; ${document.cookie}`)
            .split('; je-x-enable-menuweb=')
            .pop()
            .split(';')
            .shift();

        dataLayer.push({
            event: 'trackExperimentV2',
            experiment: {
                id: 'EX-1282',
                parent: 'EX-1282',
                name: 'menuweb-rollout_1',
                platform: 'experiment_api',
                version: 1,
                variant: {
                    name: menuWebExperimentValue
                }
            }
        });
    }
};

export {
    loadAnalyticsAccount,
    dataLayerPushPageData,
    trackMenuWebPageExperiment
};
