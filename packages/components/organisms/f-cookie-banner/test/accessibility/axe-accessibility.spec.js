import forEach from 'mocha-each';

const { getAxeResults } = require('../../../../../../test/utils/axe-helper');
const LegacyCookieBanner = require('../../test-utils/component-objects/f-cookie-banner-legacy.component');
const CookieBanner = require('../../test-utils/component-objects/f-cookie-banner.component');

describe('Legacy Cookie Banner - Accessibility tests', () => {
    let cookieBanner;

    beforeEach(async () => {
        // Arrange
        cookieBanner = new LegacyCookieBanner();
    });

    it('a11y - should test legacy f-cookie-banner component WCAG compliance', () => {
        // Act
        cookieBanner.load({ locale: 'en-AU' });

        // Assert
        const axeResults = getAxeResults('f-cookie-banner');
        expect(axeResults.violations.length).toBe(0);
    });
});

describe('Cookie Banner - Accessibility tests', () => {
    let cookieBanner;

    beforeEach(async () => {
        // Arrange
        cookieBanner = new CookieBanner();
    });

    it('a11y - should test the f-cookie-banner component WCAG compliance', () => {
        // Act
        cookieBanner.load({ locale: 'en-GB' });

        // Assert
        const axeResults = getAxeResults('f-cookie-banner');
        expect(axeResults.violations.length).toBe(0);
    });

    forEach([
        ['en-GB'],
        ['en-IE'],
        ['es-ES'],
        ['it-IT']
    ])
    .it('a11y - should have a correct tab loop order in the cookie banner component', tenant => {
        // Act
        cookieBanner.load({ locale: tenant });

        // Assert
        const expectedTabOrder = [
            cookieBanner.cookiePolicyLink,
            cookieBanner.cookieAcceptAllButton,
            cookieBanner.cookieAcceptNecessaryButton,
            cookieBanner.cookieBannerTitle];
        const result = cookieBanner.testTabOrder(expectedTabOrder);
        expect(result.actual).toEqual(result.expected);
    });
});
