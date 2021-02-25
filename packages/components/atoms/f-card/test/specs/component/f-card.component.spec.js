import CardComponent from '../../../test-utils/component-objects/f-card.component';

describe('f-card component tests', () => {
    beforeEach(() => {
        browser.url('iframe.html?id=components-atoms--card-component');
        CardComponent.waitForCard();
    });

    it('should display Card', () => {
        // Assert
        expect(CardComponent.isCardDisplayed()).toBe(true);
    });
});
