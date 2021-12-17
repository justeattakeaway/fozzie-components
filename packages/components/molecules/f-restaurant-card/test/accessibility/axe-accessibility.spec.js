import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const RestaurantCard = require('../../test-utils/component-objects/f-restaurant-card.component');

const restaurantCard = new RestaurantCard();

describe('Accessibility tests', () => {
    beforeEach(() => {
        restaurantCard.load();
    });
    it('a11y - should test f-restaurant-card component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-restaurant-card');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
