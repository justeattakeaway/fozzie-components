import utilities from './utilities';

/**
 * Returns an object containing arrays of the names of valid and invalid validation rules.
 *
 * @param {Object} $v The Vuelidate model
 * @return {Object} Containing two fields: validFields and invalidFields.
 */
const getFormValidationState = $v => {
    const invalidFields = [];
    const validFields = [];
    const flattenedParams = $v.$flattenParams();

    flattenedParams.forEach(param => {
        const deepObjectProperty = utilities.getDeepObjectByPath($v, param.path);
        const propertyFullPath = param.path.join('.');

        // Add the full path to the list of valid or invalid fields, as long as it doesn't already exist.
        if (deepObjectProperty.$invalid && invalidFields.indexOf(propertyFullPath) === -1) {
            invalidFields.push(propertyFullPath);
        } else if (!deepObjectProperty.$invalid && validFields.indexOf(propertyFullPath) === -1) {
            validFields.push(propertyFullPath);
        }
    });

    return {
        validFields,
        invalidFields
    };
};

const POSTCODE_REGEX = {
    'en-GB': /^\s*[A-z]{1,2}[ ]?[0-9]{1,2}[A-z]?[ ]*[0-9][A-z]{2}\s*$/,
    'es-ES': /^\d{5}$/,
    'it-IT': /^\d{5}$/,
    'en-AU': /^\d{4}$/,
    'en-NZ': /^\d{4}$/
};

const isValidPostcode = (postcode, locale) => POSTCODE_REGEX[locale].test(postcode);

/**
 * Tests for existence of valid chars only in a string.
 *
 * @param {string} value The string to test.
 * @return {boolean} True if there are no invalid chars in value, false otherwise.
 */
const meetsCharacterValidationRules = value => /^[\u0060\u00C0-\u00F6\u00F8-\u017Fa-zA-Z-' ]*$/.test(value);

const PHONE_REGEX = {
    'en-GB': /^(\+(44))?[0-9]{10,11}$/,
    'es-ES': /^\d{9,}$/,
    'it-IT': /^(\+39)?[ ]?([0-9]{2,3}(\/|-| )?[0-9]{6,8})$/, // https://www.drupal.org/project/phone/issues/1803126
    'en-AU': /^((?!1|13|18))(((0|\+61|61|0061)(2|4|3|7|8))\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3})$/,
    'en-NZ': /^((?!1|13|18))((0|\+64|64|0064)(2|3|4|6|9)\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}(( |-){0,1}[0-9]{1,3}|( |-){0,1}[0-9]{4}))$/
};

const isValidPhoneNumber = (number, locale) => PHONE_REGEX[locale].test(number);

export default {
    getFormValidationState,
    isValidPostcode,
    meetsCharacterValidationRules,
    isValidPhoneNumber
};
