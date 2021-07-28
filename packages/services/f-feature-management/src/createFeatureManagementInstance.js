import { init as initFeatures } from './featureGetter';
import { setContextGetter } from './contextGetter';
import { setLogger } from './logger';
import FeatureManager from './FeatureManager';

const instance = null;

/**
 * Returns singleton FeatureManagement object + initialises components on first use.
 * @param {object} settings
 * @returns Singleton FeatureManagement object
 */
export default function (settings) {
    if (instance) return instance;

    if (settings.logger) {
        setLogger(settings.logger);
    }

    initFeatures(settings.json);

    setContextGetter(settings.contextGetter);

    return new FeatureManager(settings);
}
