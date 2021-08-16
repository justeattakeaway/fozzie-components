import analyticsModule from '@/store/analytics.module';
import AnalyticService from '@/services/analytics.service';
import { mapServersidePlatformData, mapServersidePageData } from '@/services/analytics.mapper';

const defaultOptions = require('../defaultOptions');

const prepareServersideValues = (store, req, res, options) => {
    // Only available serverside
    if (typeof (window) === 'undefined') {
        const platformData = { ...store.state[`${options.namespace}`].platformData };

        mapServersidePlatformData(platformData, req);

        store.dispatch(`${options.namespace}/updatePlatformData`, platformData);

        const pageData = { ...store.state[`${options.namespace}`].pageData };

        mapServersidePageData(pageData, res);

        store.dispatch(`${options.namespace}/updatePageData`, pageData);
    }
};

const registerStoreModule = (store, options) => {
    if (!store.hasModule(options.namespace)) {
        store.registerModule(options.namespace, analyticsModule);
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

export default ({ store, req, res }, inject, _options) => {
    const options = {
        ...defaultOptions,
        ..._options
    };

    preparePageTags(options);

    registerStoreModule(store, options);

    prepareServersideValues(store, req, res, options);

    const service = new AnalyticService(store, req, options);

    inject(options.globalVarName, service);

    // If clientside, flush any stored serverside events
    service.pushEvent();
};
