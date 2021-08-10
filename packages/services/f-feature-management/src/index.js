import evaluateLogic from './evaluateLogic';
import evaluateDefault from './evaluateDefaultValue';
import { getFeatures, init as initFeatures } from './featureGetter';
import { getContext, setContextGetter } from './contextGetter';
import trackExperiment from './trackExperiment';
import { logger, setLogger } from './logger';

const logValueRequest = (func, key, value) => {
    logger.logInfo(`${func.name}: ${key} => ${value}`);
};


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

function getBooleanValue (key) {
    logValueRequest(getBooleanValue, key, true);

    const value = getValue(key);

    if (value === true || value === false) {
        return value;
    }

    return null;
}

function getIntegerValue (key) {
    logValueRequest(getIntegerValue, key, 0);

    const value = getValue(key);

    if (typeof value === 'number') {
        return value;
    }

    return null;
}

function getStringValue (key) {
    logValueRequest(getStringValue, key, '');
    const value = getValue(key);

    if (typeof value === 'string') {
        return value;
    }

    return null;
}


let instance = null;

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
