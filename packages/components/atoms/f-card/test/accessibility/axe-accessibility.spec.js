import Card from '../../test-utils/component-objects/f-card.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-card component WCAG compliance', async () => {
        // Arrange
        await Card.load();
        
        // Act
        const axeResults = await Card.getAxeResults('f-card');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
