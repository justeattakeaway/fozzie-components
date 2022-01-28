import forEach from 'mocha-each';

const AccountInfo = require('../../test-utils/component-objects/f-account-info.component');

let accountInfo;

const illegalInput = '123';

describe('f-account-info component tests', () => {
    beforeEach(() => {
        accountInfo = new AccountInfo();

        accountInfo.load();

        accountInfo.waitForComponent();
    });

    it('should display the f-account-info component', () => {
        // Assert
        expect(accountInfo.isComponentDisplayed()).toBe(true);
    });

    it('should show that the email formfield is disabled', () => {
        // Assert
        expect(accountInfo.isDisabled('emailAddress')).toBe(true);
    });

    forEach(['changeEmailAddressLink', 'saveChangesButton', 'changePasswordButton', 'deleteAccountLink'])
    .it('should check if all call to actions are clickable', cta => {
        // Assert
        expect(accountInfo.canBeClicked(cta)).toBe(true);
    });


    forEach(['firstName', 'lastName', 'phoneNumber', 'addressLine1', 'city', 'postcode'])
    .it('should display an error message immediately when %s input has been deleted', field => {
        // Act
        accountInfo.clearBlurField(field);
        accountInfo.tabOutOfField(field);

        // Assert
        expect(accountInfo.isEmptyErrorMessageDisplayed(field)).toBe(true);
    });

    it('should display the illegal first name error message immediately on click', () => {
        // Act
        accountInfo.clearBlurField('firstName');
        accountInfo.setFieldValue('firstName', illegalInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('firstName')).toBe(true);
    });

    it('should display the illegal last name error message immediately on click', () => {
        // Act
        accountInfo.clearBlurField('lastName');
        accountInfo.setFieldValue('lastName', illegalInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('lastName')).toBe(true);
    });

    it('should display the illegal phone number error message immediately on click', () => {
        // Act
        accountInfo.clearBlurField('phoneNumber');
        accountInfo.setFieldValue('phoneNumber', illegalInput);
        accountInfo.tabOutOfField('phoneNumber');

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('phoneNumber')).toBe(true);
    });

    it('should display the illegal postcode error message immediately on click', () => {
        // Act
        accountInfo.clearBlurField('postcode');
        accountInfo.setFieldValue('postcode', illegalInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('postcode')).toBe(true);
    });
});
