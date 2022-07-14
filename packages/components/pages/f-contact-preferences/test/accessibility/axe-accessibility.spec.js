import ContactPreferences from '../../test-utils/component-objects/f-contactPreferences.component';
import ContactPreferencesError from '../../test-utils/component-objects/f-contactPreferences-error.component';

describe('Accessibility tests', () => {
    const tests = [
        'en-GB'
    ];

    tests.forEach(locale => {
        it(`a11y - should test that the ${locale} f-contact-preferences component is WCAG compliant`, async () => {
            // Act
            await ContactPreferences.load({ locale });
            const axeResults = await ContactPreferences.getAxeResults('f-contact-preferences');

            // Assert
            await expect(axeResults.violations.length).toBe(0);
        });

        it(`should test that the ${locale} f-contact-preferences (error alert) is WCAG compliant`, async () => {
            // Act
            await ContactPreferences.load({
                locale,
                apiState: 'post-preferences-fails'
            });
            await ContactPreferences.clickNewsEmailCheckbox();
            await ContactPreferences.clickSubmitButton();
            const axeResults = await ContactPreferences.getAxeResults('f-contact-preferences - save error alert');

            // Assert
            await expect(axeResults.violations.length).toBe(0);
        });

        it('should test that the %s f-contact-preferences (error page) is WCAG compliant', async () => {
            // Act
            await ContactPreferencesError.load({
                locale,
                apiState: 'get-preferences-fails'
            });
            const axeResults = await ContactPreferencesError.getAxeResults('f-contact-preferences - load error page');

            // Assert
            await expect(axeResults.violations.length).toBe(0);
        });
    });
});
