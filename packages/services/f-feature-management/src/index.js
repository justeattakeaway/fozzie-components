import createFeatureManagementInstance from './createFeatureManagementInstance';

/**
 * Returns an instance of Feature Management.
 * @param {object} settings - json and contextGetter must be set
 * @returns Feature Management object to allow querying of features.
 */
export default function (settings) {
    return createFeatureManagementInstance(settings);
}
