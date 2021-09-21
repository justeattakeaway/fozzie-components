import { init as initFeatures, loadFromCdn } from './configStore';
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

    if (settings.initialConfigAsJson) {
        initFeatures(settings.initialConfigAsJson);
    }

    setContextGetter(settings.contextGetter);

    instance = new FeatureManager(settings);

    if (settings.cdn) {
        await loadFromCdn(settings.cdn, settings.onUpdated);
    }

    return instance;
}
