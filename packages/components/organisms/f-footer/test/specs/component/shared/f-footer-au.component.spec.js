const Footer = require('../../../../test-utils/component-objects/f-footer.component');
const footer = new Footer();

describe('f-footer component tests', () => {
    beforeEach(() => {
        const footerData = {
            locale: 'au',
            courierLinks: false,
            countrySelector: true
        };


        footer.open(footerData);
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
<<<<<<< HEAD:packages/components/organisms/f-footer/test/specs/component/f-footer-au.component.spec.js
        const footerData = {
            locale: 'au',
            courierLinks: false,
            countrySelector: true
        };
=======
        footer.openAUWithExtraFeatures();
        footer.waitForComponent();
>>>>>>> master:packages/components/organisms/f-footer/test/specs/component/shared/f-footer-au.component.spec.js

        // Assert
        expect(footer.areCourierLinksDisplayed()).toBe(true);
    });
});
