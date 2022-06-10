import { getAxeResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const RestaurantCard = require('../../test-utils/component-objects/f-restaurant-card.component');

const restaurantCard = new RestaurantCard();

describe('Accessibility tests', () => {
    beforeEach(async () => {
        await restaurantCard.load();
    });
    it('a11y - should test f-restaurant-card component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-restaurant-card');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
