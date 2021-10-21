import evaluateLogic from './evaluateLogic';
import evaluateDefault from './evaluateDefaultValue';
import { getFeature, init } from './configStore';
import { getContext } from './contextGetter';
import trackExperiment from './trackExperiment';
import { logger } from './logger';

const logValueRequest = (func, key, value) => {
    logger.logInfo(`${func.name}: ${key} => ${value}`);
};

/**
 * Class used to access features.  Should be created using `createFeatureManagement`
 */
class FeatureManager {
    /**
     *
     * @param {object} settings
     */
    constructor (settings) {
        this._keyPrefix = settings.keyPrefix;
        this._onTrack = settings.onTrack;
    }

    /**
     * Returns the full feature key, including any prefix
     * @param {string} key
     * @returns Full feature key
     */
    createFullKey (key) {
        return this._keyPrefix
            ? `${this._keyPrefix}::${key}`
            : key;
    }

    /**
     * Gets the value of the feature, and tracks any experiments.
     * @param {string} key
     * @returns Value of feature
     */
    getValue (key) {
        try {
            const feature = getFeature(this.createFullKey(key));

            if (!feature) {
                return null;
            }

            const context = getContext();

            if (!context) {
                logger.logError('Unable to provide feature values as no context was required. Check your settings for the plugin');
                return null;
            }

            const variant = evaluateLogic(feature, context);

            if (variant) {
                if (variant.experimentKey && variant.experimentVariant) {
                    trackExperiment(variant, this._onTrack);
                }

                return variant.value;
            }

            const defaultValue = evaluateDefault(feature, context);

            return defaultValue;
        } catch (error) {
            logger.logError(error.message, null, { error });
            return null;
        }
    }

    /**
     * Gets feature and tracks any experiments.  Checks it's a boolean before returning.
     * @param {string} key
     * @returns Boolean or null
     */
    getBooleanValue (key) {
        const value = this.getValue(key);

        if (value === true || value === false) {
            logValueRequest(this.getBooleanValue, key, value);
            return value;
        }

        return null;
    }

    /**
     * Gets feature and tracks any experiments.  Checks it's a number before returning.  (Non-integers not supported.)
     * @param {string} key
     * @returns Number or null
     */
    getIntegerValue (key) {
        const value = this.getValue(key);

        if (typeof value === 'number') {
            logValueRequest(this.getIntegerValue, key, value);
            return value;
        }

        return null;
    }

    /**
     * Gets feature and tracks any experiments.  Checks it's a string before returning.
     * @param {string} key
     * @returns String or null
     */
    getStringValue (key) {
        const value = this.getValue(key);

        if (typeof value === 'string') {
            logValueRequest(this.getStringValue, key, value);
            return value;
        }

        return null;
    }

    /* eslint-disable class-methods-use-this */
    /**
     * Updates the config with some new JSON, usually downloaded from the FM CDN.
     * @param {string} configAsJson The config, in json form.
     */
    updateConfig (configAsJson) {
        init(configAsJson);
    }
    /* eslint-enable class-methods-use-this */
}

export default FeatureManager;
