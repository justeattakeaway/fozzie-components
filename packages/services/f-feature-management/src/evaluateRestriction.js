import { logger } from './logger';


function verifyRestrictionObject (restriction) {
    const operatorsSpecified = ['and', 'or', 'eq', 'neq', 'in', 'nin', 'gt', 'gte', 'lt', 'lte']
    .filter(operator => restriction[operator]);

    if (operatorsSpecified.length > 1) {
        throw new Error(`${operatorsSpecified.length} operators specified`, operatorsSpecified);
    }
}

function all (array, predicate) {
    const passes = array.filter(i => predicate(i));

    return passes.length === array.length;
}

function any (array, predicate) {
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (predicate(item)) {
            return true;
        }
    }

    return false;
}



function getContextValue (restriction, context) {
    switch (restriction.property) {
        case 'Country':
            return context.country;
        case 'AppVersion':
            return context.appVersion;
        default:
            throw new Error('Unexpected restriction property: ', restriction.property);
    }
}

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
            return all(restriction.and, operand => evaluateRestriction(operand, context));
        }

        if (restriction.or) {
            return any(restriction.or, operand => evaluateRestriction(operand, context));
        }

        if (restriction.eq) {
            return isEqual(restriction.eq, restriction, context);
        }

        if (restriction.neq) {
            return !isEqual(restriction.neq, restriction, context);
        }

        if (restriction.in) {
            return any(restriction.in, value => isEqual(value, restriction, context));
        }

        if (restriction.nin) {
            return all(restriction.nin, value => !isEqual(value, restriction, context));
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
