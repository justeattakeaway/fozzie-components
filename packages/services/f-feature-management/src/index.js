import evaluateLogic from './evaluateLogic';
import evaluateDefault from './evaluateDefaultValue';
import { getFeatures, init as initFeatures } from './featureGetter';
import { getContext, setContextGetter } from './contextGetter';
import trackExperiment from './trackExperiment';
import { logger, setLogger } from './logger';

const logValueRequest = (func, key, value) => {
    logger.logInfo(`${func.name}: ${key} => ${value}`);
};

/**
 * Gets the value of the feature, and tracks any experiments.
 * @param {string} key
 * @returns Value of feature
 */
function getValue (key) {
    logValueRequest(getValue, key, null);

    try {
        const features = getFeatures();

        const feature = features[key];

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
function getBooleanValue (key) {
    logValueRequest(getBooleanValue, key, true);

    const value = getValue(key);

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
function getIntegerValue (key) {
    logValueRequest(getIntegerValue, key, 0);

    const value = getValue(key);

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
function getStringValue (key) {
    logValueRequest(getStringValue, key, '');
    const value = getValue(key);

    if (typeof value === 'string') {
        return value;
    }

    return null;
}


let instance = null;

/**
 * Returns an instance of Feature Management.
 * @param {object} settings - json and contextGetter must be set
 * @returns Feature Management object to allow querying of features.
 */
export default function (settings) {
    if (instance) return instance;

    if (settings.logger) {
        setLogger(settings.logger);
    }

    initFeatures(settings.json);

    setContextGetter(settings.contextGetter);

    const fullKey = key => (settings.keyPrefix
        ? `${settings.keyPrefix}::${key}`
        : key);

    instance = {
        getBooleanValue: key => getBooleanValue(fullKey(key)),
        getIntegerValue: key => getIntegerValue(fullKey(key)),
        getStringValue: key => getStringValue(fullKey(key)),
        getValue: key => getValue(fullKey(key))
    };

    return instance;
}
