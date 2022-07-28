import <%= name.filename %> from '../../test-utils/component-objects/f-<%= name.default %>.component';

describe('f-<%= name.default %> - Accessibility tests', () => {
    it('a11y - should test f-<%= name.default %> component WCAG compliance', async () => {
        // Act
        await <%= name.filename %>.load();

        // Assert
        const axeResults = await <%= name.filename %>.getAxeResults('f-<%= name.default %>');
        await expect(axeResults.violations.length).toBe(0);
    });
});
