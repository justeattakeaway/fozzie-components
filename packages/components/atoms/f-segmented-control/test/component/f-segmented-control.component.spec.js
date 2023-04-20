import SegmentedControl from '../../test-utils/component-objects/f-segmented-control.component';

describe('f-segmented-control - Component tests', () => {
    it('should display the f-segmented-control component', async () => {
        // Act
        await SegmentedControl.load();

        // Assert
        const result = await SegmentedControl.isComponentDisplayed();
        await expect(result).toBe(true);
    });
});
