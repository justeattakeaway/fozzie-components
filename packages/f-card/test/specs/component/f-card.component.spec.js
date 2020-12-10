import CardComponent from '../../../test-utils/component-objects/f-card.component';

describe('f-card component tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-atoms--card-component');
        browser.switchToFrame(0);
        CardComponent.waitForCard();
    });

    it('should display Card', () => {
        // Assert
        expect(CardComponent.isCardDisplayed()).toBe(true);
    });
});
