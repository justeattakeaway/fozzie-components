/* global browser, $ */

import {
    ALLERGEN_LINK,
    CHECKOUT_COMPONENT,
    ORDER_TIME_DROPDOWN,
    ORDER_TIME_DROPDOWN_OPTIONS,
    USER_NOTE_INPUT,
    GO_TO_PAYMENT_BUTTON,
    FIELDS
} from './f-checkout-selectors';

const { doesElementExist } = require('../../../../test/utils/webdriverio-extensions')(browser);

const checkoutComponent = () => $(CHECKOUT_COMPONENT);

// Dropdown

const orderTimeDropdown = () => $(ORDER_TIME_DROPDOWN);
const orderTimeDropdownOptions = () => $$(ORDER_TIME_DROPDOWN_OPTIONS);

// Buttons

const allergenLink = () => $(ALLERGEN_LINK);
const goToPaymentButton = () => $(GO_TO_PAYMENT_BUTTON);

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

exports.isFieldErrorDisplayed = fieldName => fields[fieldName].error().isDisplayed();
exports.isFieldDisplayed = fieldName => fields[fieldName].input().isDisplayed();
exports.isFieldTypeErrorDisplayed = fieldName => fields[fieldName].typeError().isDisplayed();
exports.waitForCheckoutComponent = () => checkoutComponent().waitForExist();
exports.isCheckoutComponentDisplayed = () => checkoutComponent().isDisplayed();
exports.isAllergenLinkDisplayed = () => allergenLink().isDisplayed();
exports.isOrderTimeDropdownDisplayed = () => orderTimeDropdown().isDisplayed();
exports.userNoteMaxCharacterCount = () => userNoteInput().getAttribute('maxlength');
exports.clickPaymentButton = () => goToPaymentButton().click();

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
exports.getOrderTimeOptionText = (index) => {
    return orderTimeDropdownOptions()[index].getText();
};
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
exports.getUserNoteLength = () => {
    return userNoteInput().getValue().length;
};
/**
 * @description
 *Submit the checkout form.
 */
exports.submit = () => {
    goToPaymentButton().click();
};

exports.doesErrorMessageExist = errorMessage => doesElementExist(FIELDS[errorMessage].error);
exports.doesInputFieldExist = inputField => doesElementExist(FIELDS[inputField].input);
