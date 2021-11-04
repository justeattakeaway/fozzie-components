const AgeVerification = require('../../test-utils/component-objects/f-ageVerification.component');

const ageVerification = new AgeVerification();

describe('f-ageVerification component tests', () => {
    beforeEach(() => {
        ageVerification.load();
    });

    it('should display the f-ageVerification component', () => {
        // Assert
        expect(ageVerification.isComponentDisplayed()).toBe(true);
    });
});
