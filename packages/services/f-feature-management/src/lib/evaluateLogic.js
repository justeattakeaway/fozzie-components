import evaluateIdHashLogic from './evaluateIdHashLogic';

/**
 * Evaluates experiment logic depending on the logic type.
 * @param {object} feature - the feature being evaluated
 * @param {object} context
 * @returns The relevant variant or null, unless the type is unrecognised in which case just null
 */
function evaluateLogic (feature, context) {
    if (!feature.evaluationLogic) {
        return null;
    }

    switch (feature.evaluationLogic.type) {
        case 'IdHash':
            return evaluateIdHashLogic(feature.evaluationLogic.detail, context);
        default:
            return null;
    }
}

export default evaluateLogic;
