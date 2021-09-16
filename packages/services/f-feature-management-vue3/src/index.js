import createFeatureManagementForVue3 from './createFeatureManagementForVue3';

/**
 * Returns an instance of Feature Management as a Vue 3 proxy.
 * @param {object} settings - json and contextGetter must be set
 * @returns Feature Management object to allow querying of features.
 */
export default function (settings) {
    return createFeatureManagementForVue3(settings);
}
