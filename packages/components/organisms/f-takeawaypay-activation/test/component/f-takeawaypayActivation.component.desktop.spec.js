const TakeawayPayActivation = require('../../test-utils/component-objects/f-takeawayPayActivation.component');
const takeawayPayActivation = new TakeawayPayActivation();

describe('f-takeawaypayActivation component tests', () => {
    beforeEach(() => {
        takeawayPayActivation.open();
        takeawayPayActivation.waitForComponent();
    });

    it('should display the f-takeawayPayActivation component', () => {
        // Assert
        expect(takeawayPayActivation.isComponentDisplayed()).toBe(true);
    });
});
