import {
    mapPlatformData,
    mapUserData,
    mapPageData
} from './analytics.mapper';

const isDataLayerPresent = () => typeof (window) !== 'undefined' && window.dataLayer;

export default class AnalyticService {
    constructor (store, req, options) {
        this.store = store;
        this.req = req;
        this.options = options;
    }

    setOptions ({ featureName = this.options.featureName, locale = this.options.locale } = {}) {
        this.options = { ...this.options, featureName, locale };

        return this.options;
    }

    pushPlatformData ({ featureName, locale, customFields } = {}) {
        let platformData = { ...this.store.state[`${this.options.namespace}`].platformData };

        mapPlatformData({
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

        mapUserData({ userData, authToken, req: this.req });

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

        mapPageData({
            pageData,
            featureName: this.options.featureName,
            pageName,
            conversationId,
            requestId,
            httpStatusCode
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
