import evaluateRestriction from './evaluateRestriction';

/**
 * Returns the first default value where the context matches the value's restrictions.
 * @param {object} feature - the feature we are evaluating.
 * @param {object} context - context (e.g. country)
 * @returns the value from the first rule whose restrictions match context
 */
function evaluateDefaultValue (feature, context) {
    const matchingRule = feature.defaultValueRules.find(rule => evaluateRestriction(rule.restrictions, context));

    return matchingRule ? matchingRule.value : null;
}

export default evaluateDefaultValue;
