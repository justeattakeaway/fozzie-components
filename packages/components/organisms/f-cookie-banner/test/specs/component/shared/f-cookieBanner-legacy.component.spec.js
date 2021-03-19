const CookieBanner = require('../../../../test-utils/component-objects/f-cookieBanner-legacy.component');
const cookieBanner = new CookieBanner();
import forEach from 'mocha-each';

describe('Legacy - Multi-tenant - f-cookieBanner component tests', () => {
    forEach(['gb', 'au', 'nz'])
    .it('should display the f-cookieBanner component', tenant => {
        // Arrange
        cookieBanner.open(tenant);
        cookieBanner.waitForComponent

        // Assert
        expect(cookieBanner.isCookieBannerComponentDisplayed()).toBe(true);
    });
});
