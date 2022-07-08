import Footer from '../../test-utils/component-objects/f-footer.component';

let locales;
describe('Accessibility tests', () => {
    locales = [
        'en-GB',
        'en-AU',
        'en-IE',
        'en-NZ',
        'es-ES',
        'it-IT'
    ];

    locales.forEach(locale => {
        it(`a11y - should test f-footer component WCAG compliance for country code "${locale}" with default options selected`, async () => {
            // Act
            await Footer.load({ locale });
            const axeResults = await Footer.getAxeResults('f-footer');

            // Assert
            expect(axeResults.violations.length).toBe(0);
        });
    });


    locales = [
        'en-GB',
        'en-AU',
        'en-IE',
        'en-NZ'
    ];

    locales.forEach(locale => {
        it(`a11y - should test f-footer component WCAG compliance for country code "${locale}" with extra options selected`, async () => {
            // Act
            await Footer.load({ locale, showCountrySelector: true });
            const axeResults = await Footer.getAxeResults('f-footer');

            // Assert
            expect(axeResults.violations.length).toBe(0);
        });
    });
});
