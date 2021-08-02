import analyticsModule from '../store/analytics.module';
import AnalyticService from './lib/analytics.service';

const defaults = require('./defaults');

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

export default ({ store }, inject, _options) => {
    const options = {
        ...defaults,
        ..._options
    };

    preparePageTags(options);

    registerStoreModule(store, options);

    const service = new AnalyticService(store, options);

    inject(options.globalVarName, service);
};
