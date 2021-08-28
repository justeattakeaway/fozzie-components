const Footer = require('../../test-utils/component-objects/f-footer.component');

let footer = new Footer();

describe('Mobile - f-footer component tests - @percy', () => {
    beforeEach(() => {
        // Act
        footer.load({
            'Locale': 'en-GB',
            'Show country selector': 'false',
            'Show courier links': 'false'
        });
    });

    it('should not show the items with the drop down boxes when in mobile view', () => {
        // Assert
        expect(footer.areFooterLinksDisplayed()).toBe(false);
    });
});
