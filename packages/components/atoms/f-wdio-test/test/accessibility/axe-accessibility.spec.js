import WdioTest from '../../test-utils/component-objects/f-wdio-test.component';

describe('f-wdio-test - Accessibility tests', () => {
    it('a11y - should test f-wdio-test component WCAG compliance', async () => {
        // Act
        await WdioTest.load();

        // Assert
        const axeResults = await WdioTest.getAxeResults('f-wdio-test');
        await expect(axeResults.violations.length).toBe(0);
    });
});
