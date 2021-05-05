const Footer = require('../../test-utils/component-objects/f-footer.component');

const footer = new Footer();

describe('Mobile - f-footer component tests - @browserstack', () => {
    beforeEach(() => {
        const footerData = {
            locale: 'gb',
            courierLinks: false,
            countrySelector: true
        };

        footer.open(footerData);
        footer.waitForComponent();
    });

    it('should not show the items with the drop down boxes when in mobile view', () => {
        // Assert
        expect(footer.areFooterLinksDisplayed()).toBe(false);
    });
});
