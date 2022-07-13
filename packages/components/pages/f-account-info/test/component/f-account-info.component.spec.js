import AccountInfo from '../../test-utils/component-objects/f-account-info.component';

describe('f-account-info component tests', () => {
    const illegalInput = '123';

    it('should display the f-account-info component', async () => {
        // Act
        await AccountInfo.load();

        // Assert
        await expect(await AccountInfo.isComponentDisplayed()).toBe(true);
    });

    it('should show that the email formfield is disabled', async () => {
        // Act
        await AccountInfo.load();

        // Assert
        await expect(await AccountInfo.isDisabled('emailAddress')).toBe(true);
    });

    const ctas = [
        'changeEmailAddressLink',
        'saveChangesButton',
        'changePasswordButton',
        'deleteAccountLink'
    ];

    ctas.forEach(cta => {
        it(`should check if ${cta} action is clickable`, async () => {
            // Act
            await AccountInfo.load();

            // Assert
            await expect(await AccountInfo.canBeClicked(cta)).toBe(true);
        });
    });

    it('should redirect to the correct URL when `change password` has been clicked', async () => {
        // Act
        await AccountInfo.load();

        await AccountInfo.clickChangePassword();

        // Assert
        await expect(await browser.getUrl()).toContain('/account/change-password');
    });

    it('should redirect to the correct URL when `delete account` has been clicked', async () => {
        // Arrange
        const expectedUrl = '/account/deactivate';

        // Act
        await AccountInfo.load();

        await AccountInfo.clickDeleteAccountLink();
        await browser.switchWindow(new RegExp(`^.*${expectedUrl}.*$`));

        // Assert
        await expect(await browser.getUrl()).toContain(expectedUrl);
    });

    it('should redirect to the correct URL when `change email address link` has been clicked', async () => {
        // Arrange
        const expectedUrl = '/help/article/203097431/how-do-i-manage-my-account';

        // Act
        await AccountInfo.load();

        await AccountInfo.clickChangeEmailAddressLink();
        await browser.switchWindow(new RegExp(`^.*${expectedUrl}.*$`));

        // Assert
        await expect(await browser.getUrl()).toContain(expectedUrl);
    });

    const fields = [
        'firstName',
        'lastName',
        'phoneNumber',
        'addressLine1',
        'city',
        'postcode'
    ];

    fields.forEach(field => {
        it(`should display an error message immediately when ${field} input has been deleted`, async () => {
            // Act
            await AccountInfo.load();

            await AccountInfo.clearBlurField(field);
            await AccountInfo.tabOutOfField(field);

            // Assert
            await expect(await AccountInfo.isEmptyErrorMessageDisplayed(field)).toBe(true);
        });
    });

    it('should display the illegal first name error message immediately on click', async () => {
        // Act
        await AccountInfo.load();

        await AccountInfo.clearBlurField('firstName');
        await AccountInfo.setFieldValue('firstName', illegalInput);
        await AccountInfo.clickOutOfInputField();

        // Assert
        await expect(await AccountInfo.isInvalidErrorMessageDisplayed('firstName')).toBe(true);
    });

    it('should display the illegal last name error message immediately on click', async () => {
        // Act
        await AccountInfo.load();

        await AccountInfo.clearBlurField('lastName');
        await AccountInfo.setFieldValue('lastName', illegalInput);
        await AccountInfo.clickOutOfInputField();

        // Assert
        await expect(await AccountInfo.isInvalidErrorMessageDisplayed('lastName')).toBe(true);
    });

    it('should display the illegal phone number error message immediately on click', async () => {
        // Act
        await AccountInfo.load();
        await AccountInfo.clearBlurField('phoneNumber');
        await AccountInfo.setFieldValue('phoneNumber', illegalInput);
        await AccountInfo.tabOutOfField('phoneNumber');

        // Assert
        await expect(await AccountInfo.isInvalidErrorMessageDisplayed('phoneNumber')).toBe(true);
    });

    it('should display the illegal postcode error message immediately on click', async () => {
        // Act
        await AccountInfo.load();

        await AccountInfo.clearBlurField('postcode');
        await AccountInfo.setFieldValue('postcode', illegalInput);
        await AccountInfo.clickOutOfInputField();

        // Assert
        await expect(await AccountInfo.isInvalidErrorMessageDisplayed('postcode')).toBe(true);
    });

    it('should display the %s Error page if GET fails', async () => {
        // Act
        AccountInfo.load({ locale: 'en-GB', apiState: 'get-details-fails' });

        // Assert
        await expect(await AccountInfo.isErrorCardComponentDisplayed()).toBe(true);
    });

    it('should display the %s Submit success alert if Submit succeed', async () => {
        // Arrange
        await AccountInfo.load({ locale: 'en-GB' });

        await AccountInfo.clearBlurField('firstName');
        await AccountInfo.setFieldValue('firstName', 'Hazza'); // dirty the form to allow submit

        // Act
        await AccountInfo.clickSaveButton();

        // Assert
        await expect(await AccountInfo.isErrorAlertDisplayed()).toBe(false);
        await expect(await AccountInfo.isSuccessAlertDisplayed()).toBe(true);
    });

    it('should display the %s Submit error alert if Submit fails', async () => {
        // Arrange
        await AccountInfo.load({ locale: 'en-GB', apiState: 'patch-details-fails' });

        await AccountInfo.clearBlurField('firstName');
        await AccountInfo.setFieldValue('firstName', 'Hazza'); // dirty the form to allow submit

        // Act
        await AccountInfo.clickSaveButton();

        // Assert
        await expect(await AccountInfo.isSuccessAlertDisplayed()).toBe(false);
        await expect(await AccountInfo.isErrorAlertDisplayed()).toBe(true);
    });
});
