const Footer = require('../../../test-utils/component-objects/f-footer.component');
const footer = new Footer();

describe('f-footer component tests', () => {
    beforeEach(() => {
        const footerData = {
            locale: 'au',
            courierLinks: false,
            countrySelector: true
        };


        footer.open(footerData);
        footer.waitForComponent();
    });

    it('Should not show courier links on en-AU if courier links is set to false', () => {
        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
    });

    it('Should show courier links on en-AU locale', () => {
        // Arrange
        const footerData = {
            locale: 'au',
            courierLinks: false,
            countrySelector: true
        };

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(true);
    });
});
