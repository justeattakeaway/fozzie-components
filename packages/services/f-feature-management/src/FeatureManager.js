import evaluateLogic from './evaluateLogic';
import evaluateDefault from './evaluateDefaultValue';
import { getFeature } from './featureGetter';
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
        logValueRequest(this.getValue, key, null);

        try {
            const feature = getFeature(this.createFullKey(key));

            if (!feature) {
                return null;
            }

            const context = getContext();

            const variant = evaluateLogic(feature, context);

            if (variant) {
                if (variant.experimentKey && variant.experimentVariant) {
                    trackExperiment(variant);
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
        logValueRequest(this.getBooleanValue, key, true);

        const value = this.getValue(key);

        if (value === true || value === false) {
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
        logValueRequest(this.getIntegerValue, key, 0);

        const value = this.getValue(key);

        if (typeof value === 'number') {
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
        logValueRequest(this.getStringValue, key, '');
        const value = this.getValue(key);

        if (typeof value === 'string') {
            return value;
        }

        return null;
    }
}

export default FeatureManager;
