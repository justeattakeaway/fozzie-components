import forEach from 'mocha-each';

const AccountInfo = require('../../test-utils/component-objects/f-account-info.component');

describe('f-account-info component tests', () => {
    let accountInfo;
    const illegalInput = '123';

    beforeEach(() => {
        accountInfo = new AccountInfo();
    });

    it('should display the f-account-info component', () => {
        // Act
        accountInfo.load();

        // Assert
        expect(accountInfo.isComponentDisplayed()).toBe(true);
    });

    it('should show that the email formfield is disabled', () => {
        // Act
        accountInfo.load();

        // Assert
        expect(accountInfo.isDisabled('emailAddress')).toBe(true);
    });

    forEach(['changeEmailAddressLink', 'saveChangesButton', 'changePasswordButton', 'deleteAccountLink'])
    .it('should check if all call to actions are clickable', cta => {
        // Act
        accountInfo.load();

        // Assert
        expect(accountInfo.canBeClicked(cta)).toBe(true);
    });

    it('should redirect to the correct URL when `change password` has been clicked', () => {
        // Act
        accountInfo.load();
        accountInfo.clickChangePassword();

        // Assert
        expect(browser.getUrl()).toContain('/account/change-password');
    });

    it('should redirect to the correct URL when `delete account` has been clicked', () => {
        // Arrange
        const expectedUrl = '/account/deactivate';

        // Act
        accountInfo.load();

        accountInfo.clickDeleteAccountLink();
        browser.switchWindow(new RegExp(`^.*${expectedUrl}.*$`));

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
    });

    it('should redirect to the correct URL when `change email address link` has been clicked', () => {
        // Arrange
        const expectedUrl = '/help/article/203097431/how-do-i-manage-my-account';

        // Act
        accountInfo.load();
        accountInfo.clickChangeEmailAddressLink();
        browser.switchWindow(new RegExp(`^.*${expectedUrl}.*$`));

        // Assert
        expect(browser.getUrl()).toContain(expectedUrl);
    });

    forEach(['firstName', 'lastName', 'phoneNumber', 'addressLine1', 'city', 'postcode'])
    .it('should display an error message immediately when %s input has been deleted', field => {
        // Act
        accountInfo.load();
        accountInfo.clearBlurField(field);
        accountInfo.tabOutOfField(field);

        // Assert
        expect(accountInfo.isEmptyErrorMessageDisplayed(field)).toBe(true);
    });

    it('should display the illegal first name error message immediately on click', () => {
        // Act
        accountInfo.load();
        accountInfo.clearBlurField('firstName');
        accountInfo.setFieldValue('firstName', illegalInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('firstName')).toBe(true);
    });

    it('should display the illegal last name error message immediately on click', () => {
        // Act
        accountInfo.load();
        accountInfo.clearBlurField('lastName');
        accountInfo.setFieldValue('lastName', illegalInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('lastName')).toBe(true);
    });

    it('should display the illegal phone number error message immediately on click', () => {
        // Act
        accountInfo.load();
        accountInfo.clearBlurField('phoneNumber');
        accountInfo.setFieldValue('phoneNumber', illegalInput);
        accountInfo.tabOutOfField('phoneNumber');

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('phoneNumber')).toBe(true);
    });

    it('should display the illegal postcode error message immediately on click', () => {
        // Act
        accountInfo.load();
        accountInfo.clearBlurField('postcode');
        accountInfo.setFieldValue('postcode', illegalInput);
        accountInfo.clickOutOfInputField();

        // Assert
        expect(accountInfo.isInvalidErrorMessageDisplayed('postcode')).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Error page if GET fails', locale => {
        // Act
        accountInfo.load({ locale, apiState: 'get-details-fails' });

        // Assert
        expect(accountInfo.isErrorCardComponentDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit success alert if Submit succeed', locale => {
        // Act
        accountInfo.load({ locale });
        accountInfo.clearBlurField('firstName');
        accountInfo.setFieldValue('firstName', 'Hazza'); // dirty the form to allow submit
        accountInfo.clickSaveButton();

        // Assert
        expect(accountInfo.isErrorAlertDisplayed()).toBe(false);
        expect(accountInfo.isSuccessAlertDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit error alert if Submit fails', locale => {
        // Act
        accountInfo.load({ locale, apiState: 'patch-details-fails' });
        accountInfo.clearBlurField('firstName');
        accountInfo.setFieldValue('firstName', 'Hazza'); // dirty the form to allow submit
        accountInfo.clickSaveButton();

        // Assert
        expect(accountInfo.isSuccessAlertDisplayed()).toBe(false);
        expect(accountInfo.isErrorAlertDisplayed()).toBe(true);
    });
});
