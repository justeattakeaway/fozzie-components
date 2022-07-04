import Link from '../../test-utils/component-objects/f-link.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-link component WCAG compliance', async () => {
        // Arrange
        await Link.load();
        
        // Act
        const axeResults = await Link.getAxeResults('f-link');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
