const Page = require('@justeat/f-wdio-utils/src/page.object');
const {
    CHECKOUT_COMPONENT,
    ORDER_TIME_DROPDOWN,
    ORDER_TIME_DROPDOWN_OPTIONS,
    USER_NOTE_INPUT,
    GO_TO_PAYMENT_BUTTON,
    FIELDS,
    KNOB_CHECKOUT_DROPDOWN,
    KNOB_BUTTON,
    SWITCH_USER_LINK,
    GUEST_CHECKOUT_HEADER,
    GUEST_CHECKOUT_LOGIN_BUTTON,
    PRE_ORDER_WARNING,
    CHECKOUT_ERROR_MESSAGE,
    RETRY_BUTTON,
    DUP_ORDER_GO_TO_HISTORY_BUTTON,
    ERROR_PAGE_COMPONENT,
    ERROR_PAGE_HEADING,
    ERROR_PAGE_DESCRIPTION,
    ERROR_PAGE_IMAGE
} = require('./f-checkout-selectors');

module.exports = class Checkout extends Page {
    get component () { return $(CHECKOUT_COMPONENT); }

    get orderTimeDropdown () { return $(ORDER_TIME_DROPDOWN); }

    get orderTimeDropdownOptions () { return $$(ORDER_TIME_DROPDOWN_OPTIONS); }

    get knobCheckoutDropdown () { return $(KNOB_CHECKOUT_DROPDOWN); }

    get goToPaymentButton () { return $(GO_TO_PAYMENT_BUTTON); }

    get knobButton () { return $(KNOB_BUTTON); }

    get userNoteInput () { return $(USER_NOTE_INPUT); }

    get switchUserLink () { return $(SWITCH_USER_LINK); }

    get guestCheckoutHeader () { return $(GUEST_CHECKOUT_HEADER); }

    get guestCheckoutLoginButton () { return $(GUEST_CHECKOUT_LOGIN_BUTTON); }

    get preOrderWarning () { return $(PRE_ORDER_WARNING); }

    get checkoutErrorMessage () { return $(CHECKOUT_ERROR_MESSAGE); }

    get errorMessageRetry () { return $(RETRY_BUTTON); }

    get errorMessageDupOrderGoToHistory () { return $(DUP_ORDER_GO_TO_HISTORY_BUTTON); }

    get errorPageComponent () { return $(ERROR_PAGE_COMPONENT); }

    get errorPageDescription () { return $(ERROR_PAGE_DESCRIPTION); }

    get errorPageHeading () { return $(ERROR_PAGE_HEADING); }

    get errorPageImage () { return $(ERROR_PAGE_IMAGE); }

    fields = {
        firstName: {
            get input () { return $(FIELDS.firstName.input); },
            get error () { return $(FIELDS.firstName.error); }
        },
        lastName: {
            get input () { return $(FIELDS.lastName.input); },
            get error () { return $(FIELDS.lastName.error); }
        },
        emailAddress: {
            get input () { return $(FIELDS.emailAddress.input); },
            get error () { return $(FIELDS.emailAddress.error); }
        },
        mobileNumber: {
            get input () { return $(FIELDS.mobileNumber.input); },
            get emptyError () { return $(FIELDS.mobileNumber.emptyError); },
            get invalidError () { return $(FIELDS.mobileNumber.invalidError); }
        },
        addressLine1: {
            get input () { return $(FIELDS.addressLine1.input); },
            get error () { return $(FIELDS.addressLine1.error); }
        },
        addressLine2: {
            get input () { return $(FIELDS.addressLine2.input); },
            get error () { return $(FIELDS.addressLine2.error); }
        },
        addressLocality: {
            get input () { return $(FIELDS.addressLocality.input); },
            get error () { return $(FIELDS.addressLocality.error); }
        },
        addressPostcode: {
            get input () { return $(FIELDS.addressPostcode.input); },
            get error () { return $(FIELDS.addressPostcode.error); },
            get typeError () { return $(FIELDS.addressPostcode.typeError); }
        },
        userNote: {
            get input () { return $(FIELDS.userNote.input); },
            get error () { return ''; }
        },
        tableIdentifier: {
            get input () { return $(FIELDS.tableIdentifier.input); },
            get maxLengthError () { return $(FIELDS.tableIdentifier.maxLengthError); }
        }
    }
    /**
     * @description
     * Sets the data for the checkout component.
     *
     * @param {Object} checkout
     * @param {String} checkout.type The checkout type
     * @param {String} checkout.isAuthenticated The checkout authentication
     * @param {String} checkout.isValid The checkout validation
     */

    open (url) {
        super.open(url);
    }

    withQuery (name, value) {
        super.withQuery(name, value);
        return this;
    }

    waitForComponent () {
        super.waitForComponent(this.component);
    }

    waitForErrorPageComponent () {
        super.waitForComponent(this.errorPageComponent);
    }

    isCheckoutPageDisplayed () {
        return this.component.isDisplayed();
    }

    isPostcodeTypeErrorDisplayed () {
        return this.fields.addressPostcode.typeError.isDisplayed();
    }

    isTableIdentifierMaxLengthErrorDisplayed () {
        return this.fields.tableIdentifier.maxLengthError.isDisplayed();
    }

    isOrderTimeDropdownDisplayed () {
        return this.orderTimeDropdown.isDisplayed();
    }

    userNoteMaxCharacterCount () {
        return this.userNoteInput.getAttribute('maxlength');
    }

    clickPaymentButton () {
        return this.goToPaymentButton.click();
    }

    clickGuestCheckoutLoginButton () {
        return this.guestCheckoutLoginButton.click();
    }

    clickRetryButton () {
        return this.errorMessageRetry.click();
    }

    clickDupOrderGoToHistoryButton () {
        return this.errorMessageDupOrderGoToHistory.click();
    }

    /**
    * @description
    * Inputs user details into the registration component and submits the form.
    *
    * @param {Object} userInfo
    * @param {String} userInfo.firstName The user's first name
    * @param {String} userInfo.lastName The user's last name
    * @param {String} userInfo.email The user's e-mail address
    * @param {String} userInfo.password The user's password
    */
    submitForm (userInfo) {
        this.fields.firstName.input.setValue(userInfo.firstName);
        this.fields.lastName.input.setValue(userInfo.lastName);
        this.fields.email.input.setValue(userInfo.email);
        this.fields.password.input.setValue(userInfo.password);
        this.createAccountButton.click();
    }

    isCheckoutErrorMessageDisplayed () {
        return this.checkoutErrorMessage.isDisplayedInViewport();
    }

    isCheckoutErrorCloseButtonDisplayed () {
        return this.errorMessageRetry.isDisplayed();
    }

    isCheckoutErrorDupOrderGoToHistoryButtonDisplayed () {
        return this.errorMessageDupOrderGoToHistory.isDisplayed();
    }

    /**
    * @description
    * Inputs address details into the checkout component.
    *
    * @param {Object} addressInfo
    * @param {String} addressInfo.mobileNumber The user's mobile number
    * @param {String} addressInfo.line1 First line of the user's address
    * @param {String} addressInfo.line2 Second line of the user's address
    * @param {String} addressInfo.locality Locality of the user's address
    * @param {String} addressInfo.postcode Postcode of the user's address
    * @param {String} addressInfo.note The user's extra note
    */
    populateCheckoutForm (addressInfo) {
        this.waitForComponent();
        this.fields.mobileNumber.input.setValue(addressInfo.mobileNumber);
        this.fields.addressLine1.input.setValue(addressInfo.line1);
        this.fields.addressLine2.input.setValue(addressInfo.line2);
        this.fields.addressLocality.input.setValue(addressInfo.locality);
        this.fields.addressPostcode.input.setValue(addressInfo.postcode);
        this.fields.userNote.input.setValue(addressInfo.note);
    }

    /**
    * @description
    * Inputs address details into the checkout component.
    *
    * @param {Object} addressInfo
    * @param {String} addressInfo.emailAddress The user's email addess
    * @param {String} addressInfo.mobileNumber The user's mobile number
    * @param {String} addressInfo.line1 First line of the user's address
    * @param {String} addressInfo.line2 Second line of the user's address
    * @param {String} addressInfo.locality Locality of the user's address
    * @param {String} addressInfo.postcode Postcode of the user's address
    * @param {String} addressInfo.note The user's extra note
    */
    populateGuestCheckoutForm (addressInfo) {
        this.waitForComponent();
        this.fields.emailAddress.input.setValue(addressInfo.emailAddress);
        this.fields.mobileNumber.input.setValue(addressInfo.mobileNumber);
        this.fields.addressLine1.input.setValue(addressInfo.line1);
        this.fields.addressLine2.input.setValue(addressInfo.line2);
        this.fields.addressLocality.input.setValue(addressInfo.locality);
        this.fields.addressPostcode.input.setValue(addressInfo.postcode);
        this.fields.userNote.input.setValue(addressInfo.note);
    }

    /**
    * @description
    * Inputs customer details into the checkout component.
    *
    * @param {Object} customerInfo
    * @param {String} customerInfo.mobileNumber The user's mobile number
    * @param {String} customerInfo.tableIdentifier The user's table ID
    * @param {String} customerInfo.note The user's extra note
    */
    populateDineInCheckoutForm (customerInfo) {
        this.waitForComponent();
        this.fields.mobileNumber.input.setValue(customerInfo.mobileNumber);
        this.fields.tableIdentifier.input.setValue(customerInfo.tableIdentifier);
        this.fields.userNote.input.setValue(customerInfo.note);
    }

    /**
    * @description
    * Changes checkout page to reflect checkout method to either delivery or collection depending on index given.
    *
    * @param {string} method The collection type: either 'delivery' or 'collection'
    */

    changeCheckoutMethod (method) {
        const file = `/checkout-${method}.json`;
        this.knobButton.click();
        this.knobCheckoutDropdown.selectByVisibleText(file);
    }

    /**
    * @description
    * Adds a space and backspaces to clear the value of the form field.
    * For more information on this, you can check out the link below:
    * https://github.com/webdriverio/webdriverio/issues/530#issuecomment-229435909
    *
    * @param {String} fieldName The name of the field input it is clearing
    */
    clearField (fieldName) {
        const BACKSPACE_UNICODE = '\uE003';
        this.fields[fieldName].input.setValue([' ', BACKSPACE_UNICODE]);
    }

    /**
     * @description
     * Adds a space and backspaces to clear the value of the form field.
     *
     * @param {String} fields Grabs the fields of the above object and runs a forEach loop to get the keys
     */
    clearCheckoutForm (fieldName) {
        this.waitForComponent();
        this.clearField(fieldName);
    }

    populateCollectionCheckoutForm (addressInfo) {
        this.waitForComponent();
        this.fields.mobileNumber.input.setValue(addressInfo.mobileNumber);
        this.fields.userNote.input.setValue(addressInfo.note);
    }

    /**
    * @description
    * Sets the value of the order time in dropdown based on visible text.
    *
    * @param {String} orderTime The visible text value of the order time
    */
    selectOrderTime (orderTime) {
        this.orderTimeDropdown.selectByVisibleText(orderTime);
    }

    /**
     * @description
     * Sets the value of the Checkout field.
     *
     * @param {String} Field name
     * @param {String} Value to set
     */
    setFieldValue (fieldName, value) {
        this.fields[fieldName].input.setValue(value);
    }

    /**
    * @description
    * Gets the value of the Checkout field.
    *
    * @param {String} Field name
    *
    * @returns {String} The value of the field
    */
    getFieldValue (fieldName) {
        return this.fields[fieldName].input.getValue();
    }

    /**
    * @description
    *Submit the checkout form.
    */
    goToPayment () {
        this.goToPaymentButton.scrollIntoView();
        this.goToPaymentButton.click();
    }
};
