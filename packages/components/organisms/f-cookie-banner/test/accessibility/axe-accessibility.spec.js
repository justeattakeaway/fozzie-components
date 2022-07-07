import LegacyCookieBanner from '../../test-utils/component-objects/f-cookie-banner-legacy.component';
import CookieBanner from '../../test-utils/component-objects/f-cookie-banner.component';

describe('Legacy Cookie Banner - Accessibility tests', () => {
    it('a11y - should test legacy f-cookie-banner component WCAG compliance', async () => {
        // Act
        await LegacyCookieBanner.load({ locale: 'en-AU' });

        // Assert
        const axeResults = await LegacyCookieBanner.getAxeResults('f-cookie-banner');
        expect(axeResults.violations.length).toBe(0);
    });
});

describe('Cookie Banner - Accessibility tests', () => {
    it('a11y - should test the f-cookie-banner component WCAG compliance', async () => {
        // Act
        await CookieBanner.load({ locale: 'en-GB' });

        // Assert
        const axeResults = await CookieBanner.getAxeResults('f-cookie-banner');
        expect(axeResults.violations.length).toBe(0);
    });




    const tenants = [
        'en-GB',
        'en-IE',
        'es-ES'
    ];

    tenants.forEach(tenant => {
        it('a11y - should have a correct tab loop order in the cookie banner component', async () => {
            // Act
            await CookieBanner.load({ locale: tenant });

            // Assert
            const expectedTabOrder = Promise.all([
                CookieBanner.cookiePolicyLink,
                CookieBanner.cookieAcceptAllButton,
                CookieBanner.cookieAcceptNecessaryButton,
                CookieBanner.cookieBannerTitle]);

            const result = CookieBanner.testTabOrder(expectedTabOrder);
            expect(result.actual).toEqual(result.expected);
        });
    });
});
