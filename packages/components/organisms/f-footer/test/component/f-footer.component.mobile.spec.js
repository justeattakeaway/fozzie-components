const Footer = require('../../test-utils/component-objects/f-footer.component');

let footer;

describe('Mobile - f-footer component tests - @percy', () => {
    beforeEach(() => {
        // Arrange
        footer = new Footer();
        footer.withQuery('&knob-Locale', 'en-GB');
        footer.withQuery('&knob-Show country selector', 'false');
        footer.withQuery('&knob-Show courier links', 'false');

        // Act
        footer.load();
    });

    it('should not show the items with the drop down boxes when in mobile view', () => {
        // Assert
        expect(footer.areFooterLinksDisplayed()).toBe(false);
    });
});
