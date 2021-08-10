/**
 * Track experiment participation.
 * @param {object} variant with tracking information
 */
function trackExperiment (variant) {
    if (!variant.experimentKey || !variant.experimentVariant) {
        return;
    }

    // TODO: SSR equivalent

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        event: 'trackExperimentV3',
        experiment: {
            key: variant.experimentKey,
            platform: 'feature_management',
            version: 1,
            variant: variant.experimentVariant,
            deviceTimestamp: new Date().toISOString()
        }
    });
}

export default trackExperiment;
