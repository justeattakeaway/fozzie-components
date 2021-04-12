const Footer = require('../../../../test-utils/component-objects/f-footer.component');

const footer = new Footer();

describe('Mobile - f-footer component tests', () => {
    beforeEach(() => {
        const footerData = {
            locale: 'gb',
            courierLinks: false,
            countrySelector: true
        };

        footer.open(footerData);
        footer.waitForComponent();

        if (process.env.JE_ENV !== 'browserstack') {
            browser.setWindowSize(500, 1000);
        }
    });

    it('should not show the items with the drop down boxes when in mobile view', () => {
        // Assert
        expect(footer.areFooterLinksDisplayed()).toBe(false);
    });
});
