import { init as initFeatures, poll as pollForFeatures } from './featureGetter';
import { setContextGetter } from './contextGetter';
import { setLogger } from './logger';
import FeatureManager from './FeatureManager';

let instance = null;

/**
 * Returns singleton FeatureManagement object + initialises components on first use.
 * Async function that awaits an initial config fetch, if polling requested.
 * @param {object} settings
 * @returns Singleton FeatureManagement object
 */
export default async function (settings) {
    if (instance) return instance;

    if (settings.logger) {
        setLogger(settings.logger);
    }

    if (settings.json) {
        initFeatures(settings.json);
    }

    setContextGetter(settings.contextGetter);

    instance = new FeatureManager(settings);

    if (settings.poll) {
        await pollForFeatures(settings, settings.onUpdated);
    }

    return instance;
}
