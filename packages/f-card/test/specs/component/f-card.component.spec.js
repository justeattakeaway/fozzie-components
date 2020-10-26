import CardComponent from '../../../test-utils/component-objects/f-card.component';

describe('f-card component tests', () => {
    beforeEach(() => {
        // Arrange
        browser.url('http://localhost:8080');
        CardComponent.waitForCard();
    });

    it('should display Card', () => {
        //Assert
        expect(CardComponent.isCardDisplayed()).toBe(true);
    });
});
