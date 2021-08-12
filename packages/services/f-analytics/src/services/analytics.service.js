import {
    PUSH_PLATFORM_DATA,
    PUSH_USER_DATA,
    PUSH_EVENT
} from '@/store/mutation-types';
import { mapPlatformData, mapUserData } from './analytics.mapper';

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

        mapPlatformData(platformData, this.featureName, this.locale, this.req);

        this.store.dispatch(`${this.namespace}/${PUSH_PLATFORM_DATA}`, platformData);

        return platformData;
    }

    pushUserData (authToken) {
        const userData = { ...this.store.state[`${this.namespace}`].userData };

        mapUserData(userData, authToken, this.req);

        this.store.dispatch(`${this.namespace}/${PUSH_USER_DATA}`, userData);

        return userData;
    }

    pushEvent (event) {
        this.store.dispatch(`${this.namespace}/${PUSH_EVENT}`, event);

        return event;
    }
}

