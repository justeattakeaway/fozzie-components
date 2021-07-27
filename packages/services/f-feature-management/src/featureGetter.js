let featureLookup = {};

/**
 * Receives json containing the feature config, as downloaded from CDN or otherwise.
 * @param {string} JSON containing the feature configuration.
 */
function init (json) {
    if (json) {
        const featuresRootObject = JSON.parse(json);

        featureLookup = {};

        featuresRootObject.features.forEach(feature => {
            featureLookup[feature.key] = feature;
        });
    }
}

/**
 * Returns the current feature lookup.
 * @returns Lookup of features by key.
 */
function getFeatures () {
    return featureLookup;
}

export { getFeatures, init };
