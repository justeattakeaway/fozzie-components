const AnalyticsComponent = require('../../test-utils/component-objects/f-analytics.component');

const analyticsComponent = new AnalyticsComponent();

describe('f-analytics component tests', () => {
    beforeEach(() => {
        analyticsComponent.open();
        analyticsComponent.waitForComponent();
    });

    it('should display the f-analytics component', () => {
        // Assert
        expect(analyticsComponent.isComponentDisplayed()).toBe(true);
    });
});
