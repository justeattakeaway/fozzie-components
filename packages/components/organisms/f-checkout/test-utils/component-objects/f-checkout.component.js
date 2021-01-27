/* global browser, $ */

import {
    CHECKOUT_COMPONENT,
    ORDER_TIME_DROPDOWN,
    ORDER_TIME_DROPDOWN_OPTIONS,
    USER_NOTE_INPUT,
    GO_TO_PAYMENT_BUTTON,
    FIELDS,
    KNOB_CHECKOUT_DROPDOWN,
    KNOB_BUTTON,
    SWITCH_USER_LINK,
    GUEST_LOGIN_SIGNUP_LINK
} from './f-checkout-selectors';

const { doesElementExist } = require('../../../../../../test/utils/webdriverio-extensions')(browser);

const checkoutComponent = () => $(CHECKOUT_COMPONENT);

// Dropdown

const orderTimeDropdown = () => $(ORDER_TIME_DROPDOWN);
const orderTimeDropdownOptions = () => $$(ORDER_TIME_DROPDOWN_OPTIONS);
const knobCheckoutDropdown = () => $(KNOB_CHECKOUT_DROPDOWN);

// Buttons
const goToPaymentButton = () => $(GO_TO_PAYMENT_BUTTON);
const knobButton = () => $(KNOB_BUTTON);

// Links
const switchUserLink = () => $(SWITCH_USER_LINK);
const guestLoginLink = () => $(GUEST_LOGIN_SIGNUP_LINK);

// Form Fields

const userNoteInput = () => $(USER_NOTE_INPUT);

const fields = {
    mobileNumber: {
        input: () => $(FIELDS.mobileNumber.input),
        error: () => $(FIELDS.mobileNumber.error)
    },
    addressLine1: {
        input: () => $(FIELDS.addressLine1.input),
        error: () => $(FIELDS.addressLine1.error)
    },
    addressLine2: {
        input: () => $(FIELDS.addressLine2.input),
        error: ''
    },
    addressCity: {
        input: () => $(FIELDS.addressCity.input),
        error: () => $(FIELDS.addressCity.error)
    },
    addressPostcode: {
        input: () => $(FIELDS.addressPostcode.input),
        error: () => $(FIELDS.addressPostcode.error),
        typeError: () => $(FIELDS.addressPostcode.typeError)
    },
    userNote: {
        input: () => $(FIELDS.userNote.input),
        error: ''
    }
};

/**
 * @description
 * Changes checkout page to reflect checkout method to either delivery or collection depending on index given.
 *
 * @param {string} method The collection type: either 'delivery' or 'collection'
 */

exports.changeCheckoutMethod = method => {
    const file = `/checkout-${method}.json`;
    knobButton().click();
    knobCheckoutDropdown().selectByVisibleText(file);
};



exports.isFieldErrorDisplayed = fieldName => fields[fieldName].error().isDisplayed();
exports.isFieldDisplayed = fieldName => fields[fieldName].input().isDisplayed();
exports.isFieldTypeErrorDisplayed = fieldName => fields[fieldName].typeError().isDisplayed();
exports.waitForCheckoutComponent = () => checkoutComponent().waitForExist();
exports.isCheckoutComponentDisplayed = () => checkoutComponent().isDisplayed();
exports.isOrderTimeDropdownDisplayed = () => orderTimeDropdown().isDisplayed();
exports.userNoteMaxCharacterCount = () => userNoteInput().getAttribute('maxlength');
exports.clickPaymentButton = () => goToPaymentButton().click();
exports.switchUserLinkIsDisplayed = () => switchUserLink().isDisplayed();
exports.waitForCheckoutComponentGuest = () => guestLoginLink().waitForExist();
exports.clickGuestLoginLink = () => guestLoginLink().click();

/**
 * @description
 * Inputs address details into the checkout component.
 *
 * @param {Object} addressInfo
 * @param {String} addressInfo.mobileNumber The user's mobile number
 * @param {String} addressInfo.line1 First line of the user's address
 * @param {String} addressInfo.line2 Second line of the user's address
 * @param {String} addressInfo.city City of the user's address
 * @param {String} addressInfo.postcode Postcode of the user's address
 * @param {String} addressInfo.note The user's extra note
 */
exports.populateCheckoutForm = addressInfo => {
    exports.waitForCheckoutComponent();
    fields.mobileNumber.input().setValue(addressInfo.mobileNumber);
    fields.addressLine1.input().setValue(addressInfo.line1);
    fields.addressLine2.input().setValue(addressInfo.line2);
    fields.addressCity.input().setValue(addressInfo.city);
    fields.addressPostcode.input().setValue(addressInfo.postcode);
    fields.userNote.input().setValue(addressInfo.note);
};

/**
 * @description
 * Adds a space and backspaces to clear the value of the form field.
 * For more information on this, you can check out the link below:
 * https://github.com/webdriverio/webdriverio/issues/530#issuecomment-229435909
 *
 * @param {String} fieldName The name of the field input it is clearing
 */
exports.clearField = fieldName => {
    const BACKSPACE_UNICODE = '\uE003';
    fields[fieldName].input().setValue([' ', BACKSPACE_UNICODE]);
};

/**
 * @description
 * Adds a space and backspaces to clear the value of the form field.
 *
 * @param {String} fields Grabs the fields of the above object and runs a forEach loop to get the keys
 */
exports.clearCheckoutForm = () => {
    exports.waitForCheckoutComponent();
    Object.keys(fields).forEach(exports.clearField);
};

exports.populateCollectionCheckoutForm = addressInfo => {
    exports.waitForCheckoutComponent();
    fields.mobileNumber.input().setValue(addressInfo.mobileNumber);
    fields.userNote.input().setValue(addressInfo.note);
};

/**
 * @description
 * Sets the value of the order time in dropdown based on visible text.
 *
 * @param {String} orderTime The visible text value of the order time
 */
exports.selectOrderTime = orderTime => {
    orderTimeDropdown().selectByVisibleText(orderTime);
};

/**
 * @description
 * The time of the order should increase when a higher index is applied.
 *
 * @param {Number} index The index of the `orderTimeDropdownOptions` array
 */
exports.getOrderTimeOptionText = index => orderTimeDropdownOptions()[index].getText();

/**
 * @description
 * Sets the value of the user note.
 *
 * @param {Object} addressInfo
 * @param {String} addressInfo.note The user's extra note
 */
exports.inputUserNote = addressInfo => {
    fields.userNote.input().setValue(addressInfo.note);
};

/**
 * @description
 * Grabs the length of characters of the user note.
 *
 * @returns {number} The length of the user note
 */
exports.getUserNoteLength = () => userNoteInput().getValue().length;

/**
 * @description
 *Submit the checkout form.
 */
exports.goToPayment = () => {
    goToPaymentButton().click();
};

exports.doesErrorMessageExist = errorMessage => doesElementExist(FIELDS[errorMessage].error);
exports.doesFieldExist = inputField => doesElementExist(FIELDS[inputField].input);
