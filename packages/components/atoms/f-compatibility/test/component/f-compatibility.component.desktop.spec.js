const Compatibility = require('../../test-utils/component-objects/f-compatibility.component');

const compatibility = new Compatibility();

describe('f-compatibility component tests', () => {
    beforeEach(() => {
        compatibility.load();
    });

    it('should display the f-compatibility component', () => {
        // Assert
        expect(compatibility.isComponentDisplayed()).toBe(true);
    });
});
