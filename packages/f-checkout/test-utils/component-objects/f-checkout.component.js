const checkoutComponent = () => $('[data-test-id="checkout-component"]');

// Form Fields
const userNoteInput = () => $('[data-test-id="user-note"] textarea');

// Dropdown
const orderTimeDropdown = () => $('[data-test-id="form-select"] select');
const orderTimeDropdownOptions = () => $$('[data-test-id="form-select"] select option');

// Buttons
const goToPaymentButton = () => $('[data-test-id="confirm-payment-submit-button"]');
const allergenLink = () => $('[data-test-id="allergy-button"]');


exports.inputs = {
    mobileNumber: () => $('[data-test-id="input-mobile-number"]'),
    addressLine1: () => $('[data-test-id="input-address-line-1"]'),
    addressLine2: () => $('[data-test-id="input-address-line-2"]'),
    addressCity: () => $('[data-test-id="input-address-city"]'),
    addressPostcode: () => $('[data-test-id="input-address-postcode"]')
};
exports.orderTimeDropdownOptions = () => $$('[data-test-id="form-select"] select option');


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
 */
exports.submitCheckoutForm = addressInfo => {
    exports.waitForCheckoutComponent();
    mobileNumberInput().setValue(addressInfo.mobileNumber);
    addressLine1Input().setValue(addressInfo.line1);
    addressLine2Input().setValue(addressInfo.line2);
    addressCityInput().setValue(addressInfo.city);
    addressPostcodeInput().setValue(addressInfo.postcode);
};

/**
 * @description
 * Sets the value of the order time dropdown based on visible text.
 *
 * @param {String} dropdownTime The visible text value of the order time
 */
exports.selectOrderTime = orderTime => {
    orderTimeDropdown().selectByVisibleText(orderTime);
};

/** 
 * @description
 * The time of the order should increase when a higher index is applied.
 */
exports.getOrderTimeOptionText = (index) => {
    const element = orderTimeDropdownOptions();
   
    return element[index].getText();
};

/**
 * @description
 * Sets the value of the user note.
 *
 * @param {String} userNote The user note value to be entered
 */
exports.inputUserNoteLength = userNote => {
    userNoteInput().setValue(userNote);
    return userNoteInput().getValue().length
};

/**
 * @description
 * Submits the checkout form.
 */
exports.submit = () => {
    goToPaymentButton().click();
};

exports.getCharacterLength = (userNote) => {
userNoteInput().setValue(userNote);
userNoteInput(userNote).getText().length
}
