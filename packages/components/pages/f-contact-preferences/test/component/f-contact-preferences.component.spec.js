import ContactPreferences from '../../test-utils/component-objects/f-contactPreferences.component';
import ContactPreferencesError from '../../test-utils/component-objects/f-contactPreferences-error.component';

describe('f-contact-preferences component tests', () => {
    const tests = [
        'en-GB'
    ];

    tests.forEach(locale => {
        it(`should display the  ${locale} f-contact-preferences component`, async () => {
            // Act
            await ContactPreferences.load({ locale });

            // Assert
            await expect(await ContactPreferences.isComponentDisplayed()).toBe(true);
        });

        it(`should display the ${locale} Submit success alert if Submit succeed`, async () => {
            // Act
            await ContactPreferences.load({ locale });
            await ContactPreferences.clickNewsEmailCheckbox(); // dirty the form to allow submit
            await ContactPreferences.clickSubmitButton();
            await ContactPreferences.waitForComponent();

            // Assert
            await expect(await ContactPreferences.isErrorAlertDisplayed()).toBe(false);
            await expect(await ContactPreferences.isSuccessAlertDisplayed()).toBe(true);
        });

        it(`should display the ${locale} Submit error alert if Submit fails`, async () => {
            // Act
            await ContactPreferences.load({
                locale,
                apiState: 'post-preferences-fails'
            });

            await ContactPreferences.clickNewsEmailCheckbox(); // dirty the form to allow submit
            await ContactPreferences.clickSubmitButton();
            await ContactPreferences.waitForComponent();

            // Assert
            await expect(await ContactPreferences.isSuccessAlertDisplayed()).toBe(false);
            await expect(await ContactPreferences.isErrorAlertDisplayed()).toBe(true);
        });

        it(`should display the ${locale} Error page if Load fails`, async () => {
            // Act
            await ContactPreferencesError.load({
                locale,
                apiState: 'get-preferences-fails'
            });

            // Assert
            await expect(await ContactPreferencesError.isErrorPageDisplayed()).toBe(true);
        });
    });
});
