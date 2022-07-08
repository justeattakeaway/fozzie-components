import Header from '../../test-utils/component-objects/f-header.component';

describe('Accessibility tests', () => {
    const locales = [
        'en-GB',
        'en-AU',
        'en-NZ',
        'en-IE',
        'it-IT',
        'es-ES'
    ];

    locales.forEach(locale => {
        it(`a11y - should test f-header component WCAG compliance for "${locale}"`, async () => {
            // Act
            await Header.load({
                locale,
                showOffersLink: true,
                showDeliveryEnquiry: true
            });
            const axeResults = await Header.getAxeResults('f-header');

            // Assert
            expect(axeResults.violations.length).toBe(0);
        });
    });
});
