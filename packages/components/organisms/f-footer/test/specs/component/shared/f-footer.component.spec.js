const Footer = require('../../../../test-utils/component-objects/f-footer.component');
const footer = new Footer();

describe('Shared - f-footer component tests', () => {
    beforeEach(() => {
        const footerData = {
            locale: 'gb',
            courierLinks: false,
            countrySelector: true
        };

        footer.open(footerData);
        footer.waitForComponent();
    });

    it('should display the footer', () => {
        // Assert
        expect(footer.isComponentDisplayed()).toBe(true);
    });

    it('Should not show courier links on en-GB locale if courier links is set to false', () => {
        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
    });

    it('Should display country selector when set to true', () => {
        // Assert
        expect(footer.isCountrySelectorDisplayed()).toBe(true);
    });

    it('Should not show courier links on en-GB locale if courier links is set to true', () => {
        // Arrange
        const footerData = {
            locale: 'gb',
            courierLinks: true
        };
        // Act
        footer.open(footerData);

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
    });

    it('Should not show country selector on en-GB locale if unselected', () => {
        // Arrange
        const footerData = {
            locale: 'gb',
            courierLinks: true,
            countrySelector: false
        };
        // Act
        footer.open(footerData);

        // Assert
        expect(footer.isCountrySelectorDisplayed()).toBe(false);
    });
});
