import { logger } from './logger';

/**
 * Checks that the restriction object has at most one operator specified. Throws if not.
 * @param {object} restriction.
 */
function verifyRestrictionObject (restriction) {
    const operatorsSpecified = ['and', 'or', 'eq', 'neq', 'in', 'nin', 'gt', 'gte', 'lt', 'lte']
    .filter(operator => restriction[operator]);

    if (operatorsSpecified.length > 1) {
        throw new Error(`${operatorsSpecified.length} operators specified`, operatorsSpecified);
    }
}

/**
 * Returns the appropriate value from the context, depending on what the restriction is targetting.
 * @param {object} restriction
 * @param {object} context
 * @returns The appropriate value.
 */
function getContextValue (restriction, context) {
    switch (restriction.property) {
        case 'Country':
            return context.country;
        case 'AppVersion':
            return context.appVersion;
        default:
            throw new Error(`Unexpected restriction property: ${restriction.property}`);
    }
}

/**
 * Checks if the property is equal to the checkValue, according to the appropriate rules for the property.
 * @param {*} checkValue
 * @param {object} restriction
 * @param {object} context
 * @returns Boolean
 */
function isEqual (checkValue, restriction, context) {
    const contextValue = getContextValue(restriction, context);

    switch (restriction.property) {
        case 'Country':
            return checkValue.toLowerCase() === contextValue.toLowerCase();
        case 'AppVersion':
            return checkValue === contextValue;
        default:
            throw new Error('Unexpected restriction property: ', restriction.property);
    }
}

/**
 * Compares two version numbers of format x0.x1...xn, where xi are positive integers.
 * 1.2.0 > 1.2.
 * @param {string} valueA
 * @param {string} valueB
 * @returns 1 if A is larger, 0 if equal, -1 if B is larger
 */
function compareVersionNumbers (valueA, valueB) {
    /* eslint-disable radix */
    const partsA = valueA.split('.').map(part => parseInt(part));
    const partsB = valueB.split('.').map(part => parseInt(part));

    let i = 0;
    while (true) { // eslint-disable-line no-constant-condition
        if (i >= partsA.length) { // reached last part of A
            if (i >= partsB.length) { // reached last part of B
                // A and B are same length with no difference found - equal
                return 0;
            }
            // reached end of A without finding a difference but B is longer so B is greater
            return -1;
        } else if (i >= partsB.length) {
            // reached end of B without finding a difference but A is longer so A is greater
            return 1;
        }

        if (partsA[i] > partsB[i]) return 1;
        if (partsB[i] > partsA[i]) return -1;

        i++;
    }
}

/**
 * Checks if A is greater than B, using appropriate rules for the property.
 * @param {*} valueA
 * @param {*} valueB
 * @param {object} restriction
 * @returns Boolean
 */
function aIsGreaterThanB (valueA, valueB, restriction) {
    switch (restriction.property) {
        case 'AppVersion':
        {
            const comparisonResult = compareVersionNumbers(valueA, valueB);
            return comparisonResult === 1;
        }
        default:
            throw new Error('Property is not comparable: ', restriction.property);
    }
}

/**
 * Does a comparison check between a context value and a restriction.
 * @param {string} operator - one of gt, gte, le, lte
 * @param {object} restriction
 * @param {object} context
 * @returns Boolean
 */
function comparableCheck (operator, restriction, context) {
    const contextValue = getContextValue(restriction, context);
    const checkValue = restriction[operator];

    switch (operator) {
        case 'gt':
            return aIsGreaterThanB(contextValue, checkValue, restriction);
        case 'gte':
            return aIsGreaterThanB(contextValue, checkValue, restriction)
        || isEqual(checkValue, restriction, context);
        case 'lt':
            return aIsGreaterThanB(checkValue, contextValue, restriction);
        case 'lte':
            return aIsGreaterThanB(checkValue, contextValue, restriction)
        || isEqual(checkValue, restriction, context);
        default:
            return false;
    }
}


/**
 * Evaluates a restriction object against a context.
 *
 * @param {object} The restriction / predicate to evaluate.
 * @param {object} Information about the current context (country etc)
 * @returns Boolean
 */
function evaluateRestriction (restriction, context) {
    try {
        verifyRestrictionObject(restriction);

        if (restriction.and) {
            return restriction.and.every(operand => evaluateRestriction(operand, context));
        }

        if (restriction.or) {
            return restriction.or.some(operand => evaluateRestriction(operand, context));
        }

        if (restriction.eq) {
            return isEqual(restriction.eq, restriction, context);
        }

        if (restriction.neq) {
            return !isEqual(restriction.neq, restriction, context);
        }

        if (restriction.in) {
            return restriction.in.some(value => isEqual(value, restriction, context));
        }

        if (restriction.nin) {
            return restriction.nin.every(value => !isEqual(value, restriction, context));
        }

        if (restriction.gt) {
            return comparableCheck('gt', restriction, context);
        }

        if (restriction.gte) {
            return comparableCheck('gte', restriction, context);
        }

        if (restriction.lt) {
            return comparableCheck('lt', restriction, context);
        }

        if (restriction.lte) {
            return comparableCheck('lte', restriction, context);
        }

        return true;
    } catch (error) {
        logger.logWarn(error.message, null, { error });
        return false;
    }
}

export default evaluateRestriction;
