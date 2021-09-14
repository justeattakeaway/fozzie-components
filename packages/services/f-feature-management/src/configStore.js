import { logger } from './logger';

let featureLookup = {};
let configCreatedAt = null;
let interval = null;

/**
 * Receives json containing the feature config, as downloaded from CDN or otherwise.
 * @param {string} configAsJson JSON containing the feature configuration.
 * @param {function} onUpdated Optional callback function that gets called when new feature config gets loaded
 */
function init (configAsJson, onUpdated) {
    if (configAsJson) {
        const featuresRootObject = JSON.parse(configAsJson);

        if (configCreatedAt && (configCreatedAt >= featuresRootObject.createdAt)) {
            return;
        }

        configCreatedAt = featuresRootObject.createdAt;

        logger.logInfo(`Loading feature config created at ${configCreatedAt}`);

        featureLookup = {};

        featuresRootObject.features.forEach(feature => {
            featureLookup[feature.key] = feature;
        });

        if (typeof onUpdated === 'function') {
            onUpdated();
        }
    }
}

/**
 * Loads config from CDN and starts polling if requested.
 * @param {object} cdnSettings Contains scope, environment, key and optionally host override and pollInterval (defaults to 30s).
 * @param {function} onUpdated Optional callback function called when new config is loaded.
 */
async function loadFromCdn (cdnSettings, onUpdated) {
    const suffix = cdnSettings.key ? `-${cdnSettings.key}` : '';
    const host = cdnSettings.host || 'https://features.api.justeattakeaway.com';
    const url = `${host}/config/v1/${cdnSettings.scope}/${cdnSettings.environment}${suffix}`;

    async function fetchAndUpdate () {
        const response = await fetch(url);

        const configAsJson = await response.text();

        init(configAsJson, onUpdated);
    }

    await fetchAndUpdate();

    clearInterval(interval);

    if (cdnSettings.poll) {
        interval = setInterval(async () => {
            await fetchAndUpdate();
        }, cdnSettings.pollInterval || 30000);
    }
}

/**
 * Returns the feature object from current config.
 * @returns Feature object.
 */
function getFeature (fullKey) {
    return featureLookup[fullKey];
}

export { getFeature, init, loadFromCdn };
