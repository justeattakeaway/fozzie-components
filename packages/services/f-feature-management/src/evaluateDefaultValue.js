import evaluateRestriction from './evaluateRestriction';

/**
 * Returns the first default value where the contex matches the value's restrictions.
 * @param {object} feature - the feature we are evaluating.
 * @param {object} context - context (e.g. country)
 * @returns Boolean
 */
function evaluateDefaultValue (feature, context) {
    for (let i = 0; i < feature.defaultValueRules.length; i++) {
        const defaultValueRule = feature.defaultValueRules[i];
        if (evaluateRestriction(defaultValueRule.restrictions, context)) {
            return defaultValueRule.value;
        }
    }

    return null;
}

export default evaluateDefaultValue;
