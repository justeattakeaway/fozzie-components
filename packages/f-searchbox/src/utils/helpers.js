/**
 * Checks to see if the postcode is populated, accounts for spaces.
 *
 * @param postcode
 */
const isPostcodeEmpty = postcode => !postcode.trim();

/**
 * Regex to test UK postcode formats. Method will pass `true` if the
 * `postcode` passed in passes the regex test.
 *
 * @param postcode
 * @returns {boolean}
 */
const doesPostcodeMatchRegex = postcode => {
    // regex: https://stackoverflow.com/questions/164979/uk-postcode-regex-comprehensive#164994
    const postcodeRegex = /^([Gg][Ii][Rr]\s?0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/;
    return postcodeRegex.test(postcode);
};

export {
    isPostcodeEmpty,
    doesPostcodeMatchRegex
};
