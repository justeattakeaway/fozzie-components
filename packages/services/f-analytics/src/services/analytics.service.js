import {
    COUNTRY_INFO,
    DEFAULT_APP_TYPE,
    DEFAULT_APP_ID
} from '@/constants';

const isDataLayerPresent = () => typeof (window) !== 'undefined' && window.dataLayer;

const mapUserAgent = (platformData, req) => {
    let userAgentString;
    if (typeof (window) !== 'undefined' && navigator) {
        userAgentString = navigator.userAgent;
    } else if (req && req.headers) {
        userAgentString = req.headers['user-agent'];
    }
    if (userAgentString) platformData.userAgent = userAgentString;
};

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

        platformData.name = this.featureName;
        platformData.appType = DEFAULT_APP_TYPE;
        platformData.applicationId = DEFAULT_APP_ID;
        mapUserAgent(platformData, this.req);
        platformData.branding = COUNTRY_INFO[this.locale].brand;
        platformData.country = COUNTRY_INFO[this.locale].country;
        platformData.language = COUNTRY_INFO[this.locale].language;
        platformData.currency = COUNTRY_INFO[this.locale].currency;

        this.store.dispatch(`${this.namespace}/updatePlatformData`, platformData);

        if (isDataLayerPresent()) {
            window.dataLayer.push({ platformData: { ...this.store.state[`${this.namespace}`].platformData } });
        }

        return platformData;
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
