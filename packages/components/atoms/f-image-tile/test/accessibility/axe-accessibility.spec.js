import ImageTile from '../../test-utils/component-objects/f-image-tile.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-image-tile component WCAG compliance', async () => {
        // Arrange
        await ImageTile.load();
        
        // Act
        const axeResults = await ImageTile.getAxeResults('f-image-tile');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
