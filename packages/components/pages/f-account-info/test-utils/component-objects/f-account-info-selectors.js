exports.COMPONENT = '[data-test-id="account-info"]';
exports.CHANGE_EMAIL_ADDRESS_LINK = '[name="account-info-change-emailAddress-link"]';
exports.SAVE_CHANGES_BUTTON = '[data-test-id="account-info-save-changes-button"]';
exports.CHANGE_PASSWORD_BUTTON = '[data-test-id="account-info-change-password-button"]';
exports.DELETE_ACCOUNT_LINK = '[name="account-info-delete-account-link"]';
exports.ERROR_CARD = '[data-test-id="account-info-error-card"]';
exports.ERROR_ALERT = '[data-test-id="account-info-error-alert"]';
exports.SUCCESS_ALERT = '[data-test-id="account-info-success-alert"]';

exports.FIELDS = {
    firstName: {
        input: '[data-test-id="formfield-account-info-consumer-firstName-input"]',
        emptyError: '[data-test-id="consumer-firstName-empty-error"]',
        invalidError: '[data-test-id="consumer-firstName-invalid-error"]'
    },
    lastName: {
        input: '[data-test-id="formfield-account-info-consumer-lastName-input"]',
        emptyError: '[data-test-id="consumer-lastName-empty-error"]',
        invalidError: '[data-test-id="consumer-lastName-invalid-error"]'
    },
    emailAddress: {
        input: '[data-test-id="formfield-account-info-consumer-emailAddress-input"]'
    },
    phoneNumber: {
        input: '[data-test-id="formfield-account-info-consumer-phoneNumber-input"]',
        emptyError: '[data-test-id="consumer-phoneNumber-empty-error"]',
        invalidError: '[data-test-id="consumer-phoneNumber-invalid-error"]'
    },
    addressLine1: {
        input: '[data-test-id="formfield-account-info-consumer-line1-input"]',
        emptyError: '[data-test-id="consumer-address-line1-empty-error"]'
    },
    addressLine2: {
        input: '[data-test-id="formfield-account-info-consumer-line2-input"]'
    },
    addressLine3: {
        input: '[data-test-id="formfield-account-info-consumer-line3-input"]'
    },
    city: {
        input: '[data-test-id="formfield-account-info-consumer-locality-input"]',
        emptyError: '[data-test-id="consumer-city-empty-error"]'
    },
    postcode: {
        input: '[data-test-id="formfield-account-info-consumer-postcode-input"]',
        emptyError: '[data-test-id="consumer-postcode-empty-error"]',
        invalidError: '[data-test-id="consumer-postcode-invalid-error"]'
    }
};
