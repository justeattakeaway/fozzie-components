import { init as initFeatures } from './configStore';
import { setContextGetter } from './contextGetter';
import { setLogger } from './logger';
import FeatureManager from './FeatureManager';

let instance = null;

/**
 * Returns singleton FeatureManagement object + initialises components on first use.
 * Async function that awaits an initial config fetch, if polling requested.
 * @param {object} settings Settings, as defined in the readme
 * @param {object} httpClient An optional injected http client. If not provided, an internal instance will be created.
 * @returns Singleton FeatureManagement object
 */
export default function (settings, httpClient) { // eslint-disable-line func-names
    if (instance) return instance;

    if (settings.logger) {
        setLogger(settings.logger);
    }

    if (settings.initialConfigAsJson) {
        initFeatures(settings.initialConfigAsJson);
    }

    setContextGetter(settings.contextGetter);

    instance = new FeatureManager(settings, httpClient);

    return instance;
}
