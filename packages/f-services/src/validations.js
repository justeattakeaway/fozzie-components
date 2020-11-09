/**
 * Returns an object containing arrays of the names of valid and invalid validation rules.
 *
 * @param {Object} $v The Vuelidate model
 * @return {Object} Containing two fields: validFields and invalidFields.
 */
const getFormValidationState = $v => {
    const fields = $v.$params;
    const invalidFields = [];
    const validFields = [];

    Object.keys(fields).forEach(key => {
        if ($v[key].$invalid) {
            invalidFields.push(key);
        } else {
            validFields.push(key);
        }
    });

    return {
        validFields,
        invalidFields
    };
};

// https://stackoverflow.com/questions/164979/uk-postcode-regex-comprehensive#164994
const POSTCODE_REGEX = /^([Gg][Ii][Rr]\s?0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/;

const isValidPostcode = postcode => POSTCODE_REGEX.test(postcode);

/**
 * Tests for existence of valid chars only in a string.
 *
 * @param {string} value The string to test.
 * @return {boolean} True if there are no invalid chars in value, false otherwise.
 */
const meetsCharacterValidationRules = value => /^[\u0060\u00C0-\u00F6\u00F8-\u017Fa-zA-Z-' ]*$/.test(value);

export default {
    getFormValidationState,
    isValidPostcode,
    meetsCharacterValidationRules
};
