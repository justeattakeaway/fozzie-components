import { logger } from './logger';

let featureLookup = {};
let configCreatedAt = null;
let interval = null;

/**
 * Receives json containing the feature config, as downloaded from CDN or otherwise.
 * @param {string} json JSON containing the feature configuration.
 * @param {function} onUpdated Optional callback function that gets called when new feature config gets loaded
 */
function init (json, onUpdated) {
    if (json) {
        const featuresRootObject = JSON.parse(json);

        if (configCreatedAt && (configCreatedAt >= featuresRootObject.createdAt)) {
            return;
        }

        configCreatedAt = featuresRootObject.createdAt;

        logger.logInfo(`Loading feature config timestamped ${configCreatedAt}`);

        featureLookup = {};

        featuresRootObject.features.forEach(feature => {
            featureLookup[feature.key] = feature;
        });

        if (onUpdated) {
            onUpdated();
        }
    }
}

/**
 * Starts polling for updated feature config
 * @param {object} settings Contains scope, environment, key and optionally host override and pollInterval (defaults to 30s).
 * @param {function} onUpdated Optional callback function called when new config is loaded.
 */
async function poll (settings, onUpdated) {
    const suffix = settings.key ? `-${settings.key}` : '';
    const host = settings.host || 'https://features.api.justeattakeaway.com';
    const url = `${host}/config/v1/${settings.scope}/${settings.environment}${suffix}`;

    async function fetchAndUpdate () {
        const response = await fetch(url);

        const configJson = await response.text();

        init(configJson, onUpdated);
    }

    await fetchAndUpdate();

    clearInterval(interval);

    interval = setInterval(async () => {
        await fetchAndUpdate();
    }, settings.pollInterval || 30000);
}

/**
 * Returns the feature object from current config.
 * @returns Feature object.
 */
function getFeature (fullKey) {
    console.log('getFeature', fullKey, configCreatedAt);
    return featureLookup[fullKey];
}

export { getFeature, init, poll };
