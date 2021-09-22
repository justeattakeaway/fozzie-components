import analyticsModule from '../store/analytics.module';
import defaultOptions from '../defaultOptions';
import {
    mapPlatformData,
    mapUserData,
    mapPageData,
    mapServerSidePlatformData
} from './analytics.mapper';

const isDataLayerPresent = () => typeof (window) !== 'undefined' && window.dataLayer;

const prepareServerSideValues = (store, req, options) => {
    // Only available server side
    if (typeof (window) === 'undefined') {
        let platformData = { ...store.state[`${options.namespace}`].platformData };

        platformData = mapServerSidePlatformData({ platformData, req });

        store.dispatch(`${options.namespace}/updatePlatformData`, platformData);
    }
};

const preparePageTags = options => {
    // Only add tags if clientside and if not already added
    if (typeof (window) !== 'undefined' && !window.dataLayer) {
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

        // No JS option
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
    constructor (store, req, options) {
        this.store = store;
        this.req = req;
        this.options = {
            ...defaultOptions,
            ...options
        };

        preparePageTags(this.options);
        store.registerModule(this.options.namespace, analyticsModule, { preserveState: !!store.state[`${this.options.namespace}`] });
        prepareServerSideValues(this.store, this.req, this.options);

        // Flush any previously stored (serverside) events
        this.pushEvent();
    }

    getOptions () {
        return this.options;
    }

    setOptions ({ featureName = this.options.featureName, locale = this.options.locale } = {}) {
        this.options = { ...this.options, featureName, locale };

        return this.options;
    }

    pushPlatformData ({ featureName, locale, customFields } = {}) {
        let platformData = { ...this.store.state[`${this.options.namespace}`].platformData };

        platformData = mapPlatformData({
            platformData,
            featureName: featureName || this.options.featureName,
            locale: locale || this.options.locale,
            req: this.req
        });

        this.store.dispatch(`${this.options.namespace}/updatePlatformData`, platformData);

        if (customFields) {
            platformData = { ...this.store.state[`${this.options.namespace}`].platformData, ...customFields };
        }

        if (isDataLayerPresent()) {
            window.dataLayer.push({ platformData: { ...platformData } });
        }

        return platformData;
    }

    pushUserData ({ authToken, customFields } = {}) {
        let userData = { ...this.store.state[`${this.options.namespace}`].userData };

        userData = mapUserData({ userData, authToken, req: this.req });

        if (customFields) {
            userData = { ...userData, ...customFields };
        }

        if (isDataLayerPresent()) {
            window.dataLayer.push({ userData: { ...userData } });
        }

        return userData;
    }

    pushPageData ({
        pageName,
        conversationId,
        requestId,
        httpStatusCode,
        customFields
    } = {}) {
        let pageData = { ...this.store.state[`${this.options.namespace}`].pageData };

        pageData = mapPageData({
            pageData,
            pageName,
            conversationId,
            requestId,
            httpStatusCode,
            req: this.req
        });

        if (customFields) {
            pageData = { ...pageData, ...customFields };
        }

        if (isDataLayerPresent()) {
            window.dataLayer.push({ pageData: { ...pageData } });
        }

        return pageData;
    }

    pushEvent (event) {
        if (event) {
            this.store.dispatch(`${this.options.namespace}/updateEvents`, event);
        }

        if (isDataLayerPresent()) {
            const events = [...this.store.state[`${this.options.namespace}`].events];

            events.forEach(e => window.dataLayer.push({ ...e }));

            this.store.dispatch(`${this.options.namespace}/clearEvents`);
        }

        return event;
    }
}
