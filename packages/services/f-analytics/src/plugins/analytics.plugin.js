import analyticsModule from '../store/analytics.module';
import AnalyticService from './lib/analytics.service';
import {
    PUSH_PLATFORM_DATA,
    PUSH_EVENT
} from '../store/mutation-types';

const defaults = require('./defaults');

const isClientSide = () => typeof (window) !== 'undefined';

const isServerSide = () => typeof (window) === 'undefined';

const getCookie = (name, req) => {
    if (req && req.headers && req.headers.cookie) {
        const value = `; ${req.headers.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }

    return undefined;
};

const mapServersideValues = (store, req, options) => {
    // Only available serverside
    if (isServerSide()) {
        const platformData = { ...store.state[`${options.namespace}`].platformData };

        if (process.env.justEatEnvironment) platformData.environment = process.env.justEatEnvironment;
        if (process.env.FEATURE_VERSION) platformData.version = process.env.FEATURE_VERSION;
        if (process.env.INSTANCE_POSITION) platformData.instancePosition = process.env.INSTANCE_POSITION;

        const userPercent = getCookie('je-user_percentage', req);
        if (userPercent) platformData.jeUserPercentage = userPercent;

        store.dispatch(`${options.namespace}/${PUSH_PLATFORM_DATA}`, platformData);
    }
};

const registerStoreModule = (store, options) => {
    if (!store.hasModule(options.namespace)) {
        store.registerModule(options.namespace, analyticsModule);
    }
};

const preparePageTags = options => {
    // Only add tags if clientside and if not already added
    if (isClientSide() && !window.dataLayer) {
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

export default ({ store, req }, inject, _options) => {
    const options = {
        ...defaults,
        ..._options
    };

    preparePageTags(options);

    registerStoreModule(store, options);

    mapServersideValues(store, req, options);

    const service = new AnalyticService(store, req, options);

    inject(options.globalVarName, service);

    // Flush any stored events
    store.dispatch(`${options.namespace}/${PUSH_EVENT}`);
};
