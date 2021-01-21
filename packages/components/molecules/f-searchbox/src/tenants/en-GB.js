import { isPostcodeEmpty, doesPostcodeMatchRegex } from '../utils/helpers';
import options from './options/en-GB';

const copy = {
    locale: 'en-GB',
    buttonText: 'Search',
    fieldLabel: 'Enter your postcode',
    fieldPlaceholder: 'Enter your postcode',
    headlineSubtitle: 'Find restaurants delivering right now, near you',
    headlineTitle: 'Tuck into a takeaway today',
    fullAddressSearchSuggestions: {
        buttonCancel: 'Cancel',
        notSeeingYourAddress: 'Not seeing your address?',
        continueWith: 'Continue with',
        clearSearchBtn: 'Clear search'
    },
    errors: {
        POSTCODE_EMPTY: 'Please enter a postcode',
        POSTCODE_INVALID: 'Please enter a full, valid postcode',
        UNKNOWN_ERROR: 'An unknown error occurred'
    }
};

const component = {
    formUrl: '/search/do',
    cuisine: '',
    isShellHidden: false,
    isCompressed: false,
    query: '',
    queryString: '',
    shouldSetCookies: false,
    onSubmit: false,
    shouldAutoPopulateAddress: true,
    addressField: {
        isNumeric: false,
        name: 'postcode',
        type: 'text'
    },
    shouldClearAddressOnValidSubmit: false,
    locationFormat: location => location.postcode,
    isFullAddressSearchEnabled: options.isFullAddressSearchEnabled
};

const service = {
    validation: {
        POSTCODE_EMPTY: (value = '') => !isPostcodeEmpty(value),
        POSTCODE_INVALID: (value = '') => {
            const parsed = options.isFullAddressSearchEnabled()
                ? value.split(',')[0].trim().replace(/\s/g, '')
                : value.trim().replace(/\s/g, '');

            return parsed.length < 8 &&
                // If postcode is empty, don't raise POSTCODE_INVALID as well
                (isPostcodeEmpty(parsed) || doesPostcodeMatchRegex(parsed));
        }
    }
};

export default {
    component,
    service,
    copy
};
