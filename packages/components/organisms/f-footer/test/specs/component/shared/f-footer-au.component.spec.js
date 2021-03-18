const Footer = require('../../../../test-utils/component-objects/f-footer.component');
const footer = new Footer();

describe('Shared - f-footer component tests', () => {

    it('Should not show courier links on en-AU if courier links is set to false', () => {
        // Arrange
        footer.open('au');
        footer.waitForComponent();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
    });

    it('Should show courier links on en-AU locale', () => {
        // Arrange
        footer.openAUWithExtraFeatures();
        footer.waitForComponent();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(true);
    });
});
