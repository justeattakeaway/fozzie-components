const TakeawaypayActivation = require('../../test-utils/component-objects/f-takeawaypayActivation.component');
const takeawaypayActivation = new TakeawaypayActivation();

describe('f-takeawaypayActivation component tests', () => {
    beforeEach(() => {
        takeawaypayActivation.load();
    });

    it('should display the f-takeawaypayActivation component', () => {
        // Assert
        expect(takeawaypayActivation.isComponentDisplayed()).toBe(true);
    });
});
