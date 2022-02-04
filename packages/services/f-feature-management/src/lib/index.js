import createFeatureManagementInstance from './createFeatureManagementInstance';

/**
 * Returns an instance of Feature Management.
 * @param {object} settings - json and contextGetter must be set
 * @param {object} httpClient An optional injected http client. If not provided, an internal instance will be created.
 * @returns Feature Management object to allow querying of features.
 */
export default function (settings, httpClient) { // eslint-disable-line func-names
    return createFeatureManagementInstance(settings, httpClient);
}
