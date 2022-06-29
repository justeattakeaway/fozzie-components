import forEach from 'mocha-each';

const AccountInfo = require('../../test-utils/component-objects/f-account-info.component');

describe('f-account-info component tests', () => {
    let accountInfo;
    const illegalInput = '123';

    beforeEach(() => {
        accountInfo = new AccountInfo();
    });

    it('should display the f-account-info component', async () => {
        // Act
        await accountInfo.load();

        // Assert
        await expect(await accountInfo.isComponentDisplayed()).toBe(true);
    });

    it('should show that the email formfield is disabled', async () => {
        // Act
        await accountInfo.load();

        // Assert
        await expect(await accountInfo.isDisabled('emailAddress')).toBe(true);
    });

    forEach(['changeEmailAddressLink', 'saveChangesButton', 'changePasswordButton', 'deleteAccountLink'])
    .it('should check if all call to actions are clickable', async cta => {
        // Act
        await accountInfo.load();

        // Assert
        await expect(await accountInfo.canBeClicked(cta)).toBe(true);
    });

    it('should redirect to the correct URL when `change password` has been clicked', async () => {
        // Act
        await accountInfo.load();

        await accountInfo.clickChangePassword();

        // Assert
        await expect(await browser.getUrl()).toContain('/account/change-password');
    });

    it('should redirect to the correct URL when `delete account` has been clicked', async () => {
        // Arrange
        const expectedUrl = '/account/deactivate';

        // Act
        await accountInfo.load();

        await accountInfo.clickDeleteAccountLink();
        await browser.switchWindow(new RegExp(`^.*${expectedUrl}.*$`));

        // Assert
        await expect(await browser.getUrl()).toContain(expectedUrl);
    });

    it('should redirect to the correct URL when `change email address link` has been clicked', async () => {
        // Arrange
        const expectedUrl = '/help/article/203097431/how-do-i-manage-my-account';

        // Act
        await accountInfo.load();

        await accountInfo.clickChangeEmailAddressLink();
        await browser.switchWindow(new RegExp(`^.*${expectedUrl}.*$`));

        // Assert
        await expect(await browser.getUrl()).toContain(expectedUrl);
    });

    forEach(['firstName', 'lastName', 'phoneNumber', 'addressLine1', 'city', 'postcode'])
    .it('should display an error message immediately when %s input has been deleted', async field => {
        // Act
        await accountInfo.load();

        await accountInfo.clearBlurField(field);
        await accountInfo.tabOutOfField(field);

        // Assert
        await expect(await accountInfo.isEmptyErrorMessageDisplayed(field)).toBe(true);
    });

    it('should display the illegal first name error message immediately on click', async () => {
        // Act
        await accountInfo.load();

        await accountInfo.clearBlurField('firstName');
        await accountInfo.setFieldValue('firstName', illegalInput);
        await accountInfo.clickOutOfInputField();

        // Assert
        await expect(await accountInfo.isInvalidErrorMessageDisplayed('firstName')).toBe(true);
    });

    it('should display the illegal last name error message immediately on click', async () => {
        // Act
        await accountInfo.load();

        await accountInfo.clearBlurField('lastName');
        await accountInfo.setFieldValue('lastName', illegalInput);
        await accountInfo.clickOutOfInputField();

        // Assert
        await expect(await accountInfo.isInvalidErrorMessageDisplayed('lastName')).toBe(true);
    });

    it('should display the illegal phone number error message immediately on click', async () => {
        // Act
        await accountInfo.load();
        await accountInfo.clearBlurField('phoneNumber');
        await accountInfo.setFieldValue('phoneNumber', illegalInput);
        await accountInfo.tabOutOfField('phoneNumber');

        // Assert
        await expect(await accountInfo.isInvalidErrorMessageDisplayed('phoneNumber')).toBe(true);
    });

    it('should display the illegal postcode error message immediately on click', async () => {
        // Act
        await accountInfo.load();

        await accountInfo.clearBlurField('postcode');
        await accountInfo.setFieldValue('postcode', illegalInput);
        await accountInfo.clickOutOfInputField();

        // Assert
        await expect(await accountInfo.isInvalidErrorMessageDisplayed('postcode')).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Error page if GET fails', async locale => {
        // Act
        accountInfo.load({ locale, apiState: 'get-details-fails' });

        // Assert
        await expect(await accountInfo.isErrorCardComponentDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit success alert if Submit succeed', async locale => {
        // Arrange
        await accountInfo.load({ locale });

        await accountInfo.clearBlurField('firstName');
        await accountInfo.setFieldValue('firstName', 'Hazza'); // dirty the form to allow submit

        // Act
        await accountInfo.waitForSuccessAlertDisplayed();
        await accountInfo.clickSaveButton();

        // Assert
        await expect(await accountInfo.isErrorAlertDisplayed()).toBe(false);
        await expect(await accountInfo.isSuccessAlertDisplayed()).toBe(true);
    });

    forEach([
        ['en-GB']
    ]).it('should display the %s Submit error alert if Submit fails', async locale => {
        // Arrange
        await accountInfo.load({ locale, apiState: 'patch-details-fails' });

        await accountInfo.clearBlurField('firstName');
        await accountInfo.setFieldValue('firstName', 'Hazza'); // dirty the form to allow submit

        // Act
        await accountInfo.waitForErrorAlertDisplayed();
        await accountInfo.clickSaveButton();

        // Assert
        await expect(await accountInfo.isSuccessAlertDisplayed()).toBe(false);
        await expect(await accountInfo.isErrorAlertDisplayed()).toBe(true);
    });
});
