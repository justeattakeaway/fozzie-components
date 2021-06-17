const GtmAnalytics = require('../../test-utils/component-objects/f-analytics.component');

const gtmAnalytics = new GtmAnalytics();

describe('f-analytics component tests', () => {
    beforeEach(() => {
        gtmAnalytics.open();
        gtmAnalytics.waitForComponent();
    });

    it('should display the f-analytics component', () => {
        // Assert
        expect(gtmAnalytics.isComponentDisplayed()).toBe(true);
    });
});
