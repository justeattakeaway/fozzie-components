const forEach = require('mocha-each');
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

    forEach(['termsAndConditionsLink', 'privacyPolicyLink', 'cookiesPolicyLink'])
    .it('should check if the legal documentation is clickable', link => {
        // Assert
        expect(registration.canBeClicked(link)).toBe(true);
    });
});
