const forEach = require('mocha-each');
const Footer = require('../../../../test-utils/component-objects/f-footer.component');
const footer = new Footer();

describe('Shared - f-footer component tests for tennants: AU, IE, NZ, ES, IT, NO', () => {

    forEach(['au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('Should not show courier links and country selector if knobs are not selected', expectedLocale => {
        // Arrange
        const footerData = {
            locale: expectedLocale,
            courierLinks: false,
            countrySelector: false
        };

        // Act
        footer.open(footerData);
        footer.waitForComponent();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
        expect(footer.isCountrySelectorDisplayed()).toBe(false);
    });

    forEach(['au', 'ie', 'nz'])
    .it('Should show courier links and country selector if knobs are selected', expectedLocale => {
        // Arrange
        const footerData = {
            locale: expectedLocale,
            courierLinks: true,
            countrySelector: true
        };

        // Act
        footer.open(footerData);
        footer.waitForComponent();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(true);
        expect(footer.isCountrySelectorDisplayed()).toBe(true);
    });

    forEach(['es', 'it', 'no'])
    .it('Should only show country selector, even if courier links and country selector are chosen', expectedLocale => {
        // Arrange
        const footerData = {
            locale: expectedLocale,
            courierLinks: true,
            countrySelector: true
        };

        // Act
        footer.open(footerData);
        footer.waitForComponent();

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(false);
        expect(footer.isCountrySelectorDisplayed()).toBe(true);
    });
});
