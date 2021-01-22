import CardComponent from '../../../test-utils/component-objects/f-card.component';
import { ATOMS } from '../../../../../../../url.selectors';

describe('f-card component tests', () => {
    beforeEach(() => {
        browser.url(`${ATOMS}card-component`);
    });

    it('should display Card', () => {
        // Assert
        expect(CardComponent.isCardDisplayed()).toBe(true);
    });
});
