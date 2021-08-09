import {
    PUSH_PLATFORM_DATA,
    PUSH_EVENT
} from '../../store/mutation-types';
import {
    COUNTRY_INFO,
    DEFAULT_APP_TYPE,
    DEFAULT_APP_ID
} from '../../constants';

const isClientSide = () => typeof (window) !== 'undefined';

const mapUserAgent = (platformData, req) => {
    let userAgentString;
    if (isClientSide() && navigator) {
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

        this.store.dispatch(`${this.namespace}/${PUSH_PLATFORM_DATA}`, platformData);

        return platformData;
    }

    pushEvent (event) {
        this.store.dispatch(`${this.namespace}/${PUSH_EVENT}`, event);

        return event;
    }
}
