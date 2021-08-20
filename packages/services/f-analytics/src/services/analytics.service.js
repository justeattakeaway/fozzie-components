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
        this.namespace = options.namespace;
        this.featureName = options.featureName;
        this.locale = options.locale;
    }

    pushPlatformData () {
        const platformData = { ...this.store.state[`${this.namespace}`].platformData };

        mapPlatformData({
            platformData,
            featureName: this.featureName,
            locale: this.locale,
            req: this.req
        });

        this.store.dispatch(`${this.namespace}/updatePlatformData`, platformData);

        if (isDataLayerPresent()) {
            window.dataLayer.push({ platformData: { ...this.store.state[`${this.namespace}`].platformData } });
        }

        return platformData;
    }

    pushUserData ({ authToken } = {}) {
        const userData = { ...this.store.state[`${this.namespace}`].userData };

        mapUserData({ userData, authToken, req: this.req });

        if (isDataLayerPresent()) {
            window.dataLayer.push({ userData: { ...userData } });
        }

        return userData;
    }

    pushPageData ({
        pageName,
        conversationId,
        requestId,
        httpStatusCode
    } = {}) {
        const pageData = { ...this.store.state[`${this.namespace}`].pageData };

        mapPageData({
            pageData,
            featureName: this.featureName,
            pageName,
            conversationId,
            requestId,
            httpStatusCode
        });

        if (isDataLayerPresent()) {
            window.dataLayer.push({ pageData: { ...pageData } });
        }

        return pageData;
    }

    pushEvent (event) {
        if (event) {
            this.store.dispatch(`${this.namespace}/updateEvents`, event);
        }

        if (isDataLayerPresent()) {
            const events = [...this.store.state[`${this.namespace}`].events];

            events.forEach(e => window.dataLayer.push({ ...e }));

            this.store.dispatch(`${this.namespace}/clearEvents`);
        }

        return event;
    }
}
