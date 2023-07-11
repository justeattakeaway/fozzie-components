import defaultOptions from '../defaultOptions';
import { mapPlatformData, mapUserData, mapPageData } from './analytics.mapper';

const platformDataDefault = {
    environment: 'localhost',
    name: undefined,
    appType: undefined,
    applicationId: undefined,
    country: undefined,
    language: undefined,
    currency: undefined,
    version: undefined,
    instancePosition: undefined,
    isPilot: undefined,
    source: 'core-analytics'
};

const userDataDefault = {
    'a-UserId': undefined,
    authType: undefined,
    email: undefined,
    globalUserId: undefined,
    signinType: undefined,
    signupDate: undefined
};

const pageDataDefault = {
    name: undefined,
    conversationId: undefined,
    orientation: undefined
};

const isDataLayerPresent = () => typeof window !== 'undefined' && window.dataLayer;

const pushGAToDataLayer = (data, propName) => {
    if (isDataLayerPresent()) {
        if (propName) {
            window.dataLayer.push({ [propName]: { ...data } });
            return true;
        }

        window.dataLayer.push({ ...data });
        return true;
    }

    return false;
};

const prepareGTMHeadTag = options => {
    // Only add tag if clientside and if not already added
    if (typeof window !== 'undefined' && !window.dataLayer) {
        const queryString = options.auth ? `&gtm_auth=${options.auth}&gtm_preview=${options.preview}&gtm_cookies_win=${options.cookiesWin}` : '';

        // See : https://developers.google.com/tag-manager/quickstart
        const headJsGtmTag = `(function (w, d, s, l, i) {
                                    w[l] = w[l] || [];
                                    w[l].push({
                                        'gtm.start': new Date().getTime(),
                                        event: 'gtm.js'
                                    });
                                    var f = d.getElementsByTagName(s)[0],
                                        j = d.createElement(s),
                                        dl = l != 'dataLayer' ? '&l=' + l : '',
                                        qs = '${queryString}';
                                    j.async = true;
                                    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl + qs;
                                    f.parentNode.insertBefore(j, f);
                                })(window, document, 'script', 'dataLayer', '${options.id}');`;
        const script = document.createElement('script');
        script.text = headJsGtmTag;
        document.head.prepend(script);

        // 'No JS' option
        const iframeTag = document.createElement('iframe');
        iframeTag.src = `https://www.googletagmanager.com/ns.html?id=${options.id}`;
        iframeTag.setAttribute('height', 0);
        iframeTag.setAttribute('width', 0);
        iframeTag.style.display = 'none';
        iframeTag.style.visibility = 'hidden';
        const noScript = document.createElement('noscript');
        noScript.appendChild(iframeTag);
        document.body.prepend(noScript);
    }
};

export default class AnalyticService {
    constructor (options) {
        this.options = {
            ...defaultOptions,
            ...options
        };

        prepareGTMHeadTag(this.options);
    }

    getOptions () {
        return this.options;
    }

    setOptions ({
        featureName = this.options.featureName,
        locale = this.options.locale
    } = {}) {
        this.options = { ...this.options, featureName, locale };

        return this.options;
    }

    pushPlatformData ({ featureName, locale, customFields } = {}) {
        let platformData = mapPlatformData({
            platformData: platformDataDefault,
            featureName: featureName || this.options.featureName,
            locale: locale || this.options.locale
        });

        if (customFields) {
            platformData = { ...platformData, ...customFields };
        }

        const success = pushGAToDataLayer(platformData, 'platformData');

        return success ? platformData : undefined;
    }

    pushPageData ({
        pageName, conversationId, httpStatusCode, customFields
    } = {}) {
        let pageData = mapPageData({
            pageData: pageDataDefault,
            pageName,
            conversationId,
            httpStatusCode
        });

        if (customFields) {
            pageData = { ...pageData, ...customFields };
        }

        const success = pushGAToDataLayer(pageData, 'pageData');

        return success ? pageData : undefined;
    }

    pushUserData ({ authToken, customFields } = {}) {
        let userData = mapUserData({
            userData: userDataDefault,
            authToken,
            options: this.options
        });

        if (customFields) {
            userData = { ...userData, ...customFields };
        }

        const success = pushGAToDataLayer(userData, 'userData');

        return success ? userData : undefined;
    }

    pushEvent (event) {
        // Note; we need to remove the unwanted reflection details from being pushed
        // along with the simple object.
        // So by converting to plain simple object using stringify/parse removes these details.
        const e = JSON.parse(JSON.stringify(event));

        const success = pushGAToDataLayer(e);

        return success ? e : undefined;
    }
}
