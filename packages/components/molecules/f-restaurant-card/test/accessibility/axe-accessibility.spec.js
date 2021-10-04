import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const RestaurantCard = require('../../test-utils/component-objects/f-restaurantCard.component');
const restaurantCard = new RestaurantCard();

describe('Accessibility tests', () => {
    beforeEach(() => {
        restaurantCard.open();
        restaurantCard.waitForComponent();
    });
    it('a11y - should test f-restaurantCard component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-restaurantCard');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
