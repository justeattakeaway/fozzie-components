const Registration = require('../../test-utils/component-objects/f-registration.component');

let registration;

describe('Shared - f-registration component tests', () => {
    beforeEach(() => {
        registration = new Registration();
        registration.load();
    });

    it('should display component', () => {
        // Assert
        expect(registration.isComponentDisplayed()).toBe(true);
    });

    it('should check if the legal documentation is clickable', () => {
        // Assert
        expect(registration.termsAndConditionsLinkCanBeClicked()).toBe(true);
        expect(registration.privacyPolicyLinkCanBeClicked()).toBe(true);
        expect(registration.cookiesPolicyLinkCanBeClicked()).toBe(true);
    });
});