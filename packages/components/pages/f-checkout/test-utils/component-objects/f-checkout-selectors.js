exports.CHECKOUT_COMPONENT = '[data-test-id="checkout-component"]';
exports.ORDER_TIME_DROPDOWN = '[data-test-id="formfield-order-time-dropdown-select"]';
exports.ORDER_TIME_DROPDOWN_OPTIONS = '[data-test-id="formfield-order-time-dropdown-select"] option';
exports.USER_NOTE_INPUT = '[data-test-id="formfield-textarea"]';
exports.GO_TO_PAYMENT_BUTTON = '[data-test-id="confirm-payment-submit-button"]';
exports.KNOB_BUTTON = '[id$="tabbutton-knobs"]';
exports.KNOB_CHECKOUT_DROPDOWN = '[name="Checkout Url"]';
exports.SWITCH_USER_LINK = '[data-test-id="switch-user-link"]';
exports.GUEST_CHECKOUT_LOGIN_BUTTON = '[data-test-id="guest-login-button"]';
exports.GUEST_CHECKOUT_HEADER = '[data-test-id="guest-checkoutHeader"]';
exports.PRE_ORDER_WARNING = '[data-test-id="warning-pre-order"]';
exports.CHECKOUT_ERROR_MESSAGE = '[data-test-id="checkout-issue-modal"] div';
exports.RETRY_BUTTON = '[data-test-id="redirect-to-menu-button"]';
exports.CLOSE_MODAL = '[data-test-id="close-modal"]';
exports.DUP_ORDER_GO_TO_HISTORY_BUTTON = '[data-test-id="redirect-to-orderhistory-button"]';

// Error page
exports.ERROR_PAGE_COMPONENT = '[data-test-id="checkout-error-page-component"]';
exports.ERROR_PAGE_HEADING = '[data-test-id="checkout-error-page-heading"]';
exports.ERROR_PAGE_DESCRIPTION = '[data-test-id="checkout-error-page-description"]';
exports.ERROR_PAGE_IMAGE = '[data-test-id="checkout-error-page-image"]';

// Age verification
exports.AGE_VERIFICATION_COMPONENT = '[data-test-id="checkout-age-verification-component"]';
exports.AGE_VERIFICATION_DAY_DROPDOWN = '[data-test-id="formfield-dob-day-dropdown-select"]';
exports.AGE_VERIFICATION_MONTH_DROPDOWN = '[data-test-id="formfield-dob-month-dropdown-select"]';
exports.AGE_VERIFICATION_YEAR_DROPDOWN = '[data-test-id="formfield-dob-year-dropdown-select"]';
exports.AGE_VERIFICATION_ERROR = '[data-test-id="age-verification-error-message"]';
exports.AGE_VERIFICATION_SUBMIT_BUTTON = '[data-test-id="age-verification-redirect-button"]';
exports.FIELDS = {
    firstName: {
        input: '[data-test-id="formfield-guest-first-name-input"]',
        error: '[data-test-id="error-first-name-empty"]'
    },
    lastName: {
        input: '[data-test-id="formfield-guest-last-name-input"]',
        error: '[data-test-id="error-last-name-empty"]'
    },
    emailAddress: {
        input: '[data-test-id="formfield-guest-email-input"]',
        error: '[data-test-id="error-email-invalid"]'
    },
    mobileNumber: {
        input: '[data-test-id="formfield-mobile-number-input"]',
        emptyError: '[data-test-id="error-mobile-number-empty"]',
        invalidError: '[data-test-id="error-mobile-number-invalid"]'
    },
    addressLine1: {
        input: '[data-test-id="formfield-address-line-1-input"]',
        error: '[data-test-id="error-address-line1-empty"]'
    },
    addressLine2: {
        input: '[data-test-id="formfield-address-line-2-input"]',
        error: ''
    },
    addressLocality: {
        input: '[data-test-id="formfield-address-locality-input"]',
        error: '[data-test-id="error-address-locality-empty"]'
    },
    addressAdministrativeArea: {
        input: '[data-test-id="formfield-address-administrative-area-input"]',
        error: '[data-test-id="error-address-administrative-area-empty"]'
    },
    addressPostcode: {
        input: '[data-test-id="formfield-address-postcode-input"]',
        error: '[data-test-id="error-address-postcode-empty"]',
        typeError: '[data-test-id="error-address-postcode-type-error"]'
    },
    userNote: {
        input: '[data-test-id="formfield-note-textarea"]',
        error: ''
    },
    tableIdentifier: {
        input: '[data-test-id="formfield-table-identifier-input"]'
    }
};
