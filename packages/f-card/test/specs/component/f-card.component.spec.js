import CardComponent from '../../../test-utils/component-objects/f-card.component';

describe('f-card component tests', () => {
    it('should display Card', () => {
        //Assert
        expect(CardComponent.isCardDisplayed()).toBe(true);
    });
});
