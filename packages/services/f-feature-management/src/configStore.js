import axios from 'axios';
import { logger } from './logger';

let featureLookup = {};
let configCreatedAt = null;
let interval = null;

/**
 * Receives json containing the feature config, as downloaded from CDN or otherwise.
 * @param {string} configAsJson JSON containing the feature configuration.
 * @param {function} onUpdated Optional callback function that gets called when new feature config gets loaded
 * @return {object} The config as JSON
 */
function init (configAsJson, onUpdated) {
    if (configAsJson) {
        const newConfig = typeof (configAsJson) === 'string' ? JSON.parse(configAsJson) : configAsJson;

        if (configCreatedAt && (configCreatedAt >= newConfig.createdAt)) {
            return {};
        }

        configCreatedAt = newConfig.createdAt;

        if (!configCreatedAt) {
            return {};
        }

        logger.logInfo(`Loading feature config created at ${configCreatedAt}`);

        featureLookup = {};

        newConfig.features.forEach(feature => {
            featureLookup[feature.key] = feature;
        });

        if (typeof onUpdated === 'function') {
            onUpdated();
        }

        return newConfig;
    }

    return {};
}

/**
 * Loads config from CDN and starts polling if requested.
 * @param {object} cdnSettings Contains scope, environment, key and optionally host override and pollInterval (defaults to 30s).
 * @param {function} onUpdated Optional callback function called when new config is loaded.
 * @param {object} axiosClient Optional axios client to use for making CDN request.
 * @returns The raw JSON config (for caching purposes)
 */
async function loadFromCdn (cdnSettings, onUpdated, axiosClient = axios) {
    const suffix = cdnSettings.key ? `-${cdnSettings.key}` : '';
    const host = cdnSettings.host || 'https://features.api.justeattakeaway.com';
    const url = `${host}/config/v1/${cdnSettings.scope}/${cdnSettings.environment}${suffix}`;

    async function fetchAndUpdate () {
        const response = await axiosClient.get(url);
        init(response.data, onUpdated);
        return response.data;
    }

    const configAsJson = await fetchAndUpdate();

    clearInterval(interval);

    if (cdnSettings.poll) {
        interval = setInterval(async () => {
            await fetchAndUpdate();
        }, cdnSettings.pollInterval || 30000);
    }

    return configAsJson;
}

/**
 * Returns the feature object from current config.
 * @returns Feature object.
 */
function getFeature (fullKey) {
    return featureLookup[fullKey];
}

export { getFeature, init, loadFromCdn };
