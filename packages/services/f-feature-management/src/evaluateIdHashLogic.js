import evaluateRestriction from './evaluateRestriction';
import calculateFractions from './calculateFractions';

/**
 * Gets the first rule whose restrictions match the context.
 * @param {object} idHashLogicDetail - the owning object of the rules
 * @param {object} context
 * @returns matching rule or null
 */
function getFirstRuleMatch (idHashLogicDetail, context) {
    const matchingRule = idHashLogicDetail.rules.find(rule => evaluateRestriction(rule.restrictions, context));

    return matchingRule || null;
}

/**
 * Gets the id to hash according to what's set up in the logic.
 * @param {object} idHashLogicDetail - the detail of the id hash logic
 * @param {object} context
 * @returns the relevant id from the context
 */
function getIdToHash (idHashLogicDetail, context) {
    switch (idHashLogicDetail.bucketBy) {
        case 'AnonUserId':
            return context.anonUserId;
        default:
            throw new Error('Unexpected bucketBy ', idHashLogicDetail.bucketBy);
    }
}

/**
 * Gets the relevant variant based on the generated fraction.
 * @param {object} rule - the rule containing the variants
 * @param {object} variantFraction - the number between 0 and 1 that has been generated to choose a variant
 * @returns the variant
 */
function getVariant (rule, variantFraction) {
    if (variantFraction > 1) {
        throw new Error(`Variant fraction was ${variantFraction} but shouldn't be > 1`);
    }

    let totalWeight = 0;
    rule.variants.forEach(v => {
        totalWeight += v.weight;
    });

    // works through the variants until we have reached the "variantFraction" for the user
    let cumuFraction = 0;

    const variant = rule.variants.find(v => {
        cumuFraction += (v.weight / totalWeight);

        return cumuFraction >= variantFraction;
    });

    if (variant) {
        return variant;
    }

    // This should never happen since the cumulative fraction is always <= 1.
    throw new Error('No matching variant found.');
}

/**
 * Returns the relevant variant for this user, using the IdHash rules.
 * @param {object} idHashLogicDetail - The detail of the IdHash rules set up for this feature.
 * @param {object} context - User's id, country, etc.
 */
function evaluateIdHashLogic (idHashLogicDetail, context) {
    // 1. find the first rule where the context matches the rule's restrictions
    const matchingRule = getFirstRuleMatch(idHashLogicDetail, context);

    // 2. if no matching rule, return null - calling code will revert to defaults
    if (!matchingRule) {
        return null;
    }

    // 3. compute the audienceFraction and variantFraction, based on the relevant id and prefix for the experiment
    const { audienceFraction, variantFraction } = calculateFractions(idHashLogicDetail.prefix + getIdToHash(idHashLogicDetail, context));

    // 4. if the user is not caught in traffic allocated to the experiment, return null - calling code will revert to defaults
    if (matchingRule.audienceFraction < audienceFraction) {
        return null;
    }

    // 5. get and return the variant that the user falls into
    const variant = getVariant(matchingRule, variantFraction);

    return variant;
}

export default evaluateIdHashLogic;
