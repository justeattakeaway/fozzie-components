import SegmentedControl from '../../test-utils/component-objects/f-segmented-control.component';

describe('f-segmented-control - Accessibility tests', () => {
    it('a11y - should test f-segmented-control component WCAG compliance', async () => {
        // Act
        await SegmentedControl.load();

        // Assert
        const axeResults = await SegmentedControl.getAxeResults('f-segmented-control');
        await expect(axeResults.violations.length).toBe(0);
    });
});
