const Footer = require('../../../test-utils/component-objects/f-footer.component');
const footer = new Footer();

describe('f-footer component tests', () => {
    beforeEach(() => {
        footer.open('au');
        footer.waitForComponent();
    });

    it('Should not show courier links on en-AU if courier links is set to false', () => {
        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
    });

    it('Should show courier links on en-AU locale', () => {
        // Act
        footer.openAUWithExtraFeatures();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(true);
    });
});
