export default {
    locale: 'en-GB',
    text: 'I am a VueSearchbox Component (GB)',
    buttonText: 'Search',
    fieldLabel: 'Enter your postcode',
    fieldPlaceholder: 'Enter your postcode',
    headlineSubtitle: 'Find restaurants delivering right now, near you',
    headlineTitle: 'Tuck into a takeaway today',
    errors: {
        POSTCODE_EMPTY: 'Please enter a postcode',
        POSTCODE_INVALID: 'Please enter a full, valid postcode',
        UNKNOWN_ERROR: 'An unknown error occurred'
    }
};

const component = {
    formUrl: '/search/do',
    locationFormat: location => location.postcode
};

const isPostcodeEmpty = postcode => !postcode.trim();

const doesPostcodeMatchRegex = postcode => {
    // regex: https://stackoverflow.com/questions/164979/uk-postcode-regex-comprehensive#164994
    const postcodeRegex = /^([Gg][Ii][Rr]\s?0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/;
    return postcodeRegex.test(postcode);
};

const service = {
    validation: {
        POSTCODE_EMPTY: (value = '') => !isPostcodeEmpty(value),
        POSTCODE_INVALID: (value = '') => {
            const parsed = value.trim().replace(/\s/g, '');

            return parsed.length < 8 &&
                // If postcode is empty, don't raise POSTCODE_INVALID as well
                (isPostcodeEmpty(parsed) || doesPostcodeMatchRegex(parsed));
        }
    }
};

export {
    component,
    service
};
