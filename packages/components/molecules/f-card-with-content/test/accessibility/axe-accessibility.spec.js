import CardWithContent from '../../test-utils/component-objects/f-card-with-content.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-card-with-content component WCAG compliance', async () => {
        // Act
        await CardWithContent.load();
        const axeResults = await CardWithContent.getAxeResults('f-card-with-content');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
