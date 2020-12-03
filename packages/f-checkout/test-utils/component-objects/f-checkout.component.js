const checkoutComponent = () => $('[data-test-id="checkout-component"]');

// Form Fields

const userNoteInput = () => $('[data-test-id="user-note"] textarea');

const allergenLink = () => $('[data-test-id="allergy-button"]');

// Dropdown

const selectTimeDropdownOptions = () => $('[data-test-id="form-select"]');

const timeDropdownOptions = () => $$("select option");

const goToPaymentButton = () => $('[data-test-id="confirm-payment-submit-button"]');

exports.inputs = {
    mobileNumber: () => $('[data-test-id="input-mobile-number"]'),
    addressLine1: () => $('[data-test-id="input-address-line-1"]'),
    addressLine2: () => $('[data-test-id="input-address-line-2"]'),
    addressCity: () => $('[data-test-id="input-address-city"]'),
    addressPostcode: () => $('[data-test-id="input-address-postcode"]')
};

exports.waitForCheckoutComponent = () => checkoutComponent().waitForExist();
exports.isCheckoutComponentDisplayed = () => checkoutComponent().isDisplayed();
exports.isAllergenLinkDisplayed = () => allergenLink().isDisplayed();
exports.isDropdownDisplayed = () => selectTimeDropdownOptions().isDisplayed();

exports.selectOption = () => $$("select option");
exports.getDropdownOptionText = (index) => {
    const element = timeDropdownOptions();
   
    return element[index].getText();
}
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
 * Sets the value of the fulfillment time dropdown based on visible text.
 *
 * @param {String} dropdownTime The text visible text value of the fulfillment time
 */
exports.selectDropdownTime = dropdownTime => {
    selectTimeDropdownOptions().selectByVisibleText(dropdownTime);
};

/**
 * @description
 * Sets the value of the user note.
 *
 * @param {String} userNote The user note value to be entered
 */
exports.inputUserNote = userNote => {
    userNoteInput().setValue(userNote);
};

/**
 * @description
 * Submits the checkout form.
 */
exports.submit = () => {
    goToPaymentButton().click();
};
