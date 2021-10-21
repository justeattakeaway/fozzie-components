import { init as initFeatures, loadFromCdn as _loadFromCdn } from './configStore';
import { setContextGetter } from './contextGetter';
import { setLogger } from './logger';
import FeatureManager from './FeatureManager';

let instance = null;

/**
 * Returns singleton FeatureManagement object + initialises components on first use.
 * Async function that awaits an initial config fetch, if polling requested.
 * @param {object} settings Settings, as defined in the readme
 * @param {object} axiosClient An optional injected axios client. If not provided, an internal instance will be created.
 * @returns Singleton FeatureManagement object
 */
export default function (settings, axiosClient) {
    if (instance) return instance;

    if (settings.logger) {
        setLogger(settings.logger);
    }

    if (settings.initialConfigAsJson) {
        initFeatures(settings.initialConfigAsJson);
    }

    setContextGetter(settings.contextGetter);

    instance = new FeatureManager(settings);

    instance.loadFromCdn = async () => {
        if (settings.cdn) {
            return _loadFromCdn(settings.cdn, settings.onUpdated, axiosClient ?? undefined);
        }
        throw new Error('Must provide CDN settings for CDN load to work correctly');
    };

    return instance;
}
