import StatusBanner from '../../test-utils/component-objects/f-status-banner.component';

describe('f-status-banner component tests', () => {
    it('should display the f-statusBanner component', async () => {
        // Act
        await StatusBanner.load();

        // Assert
        await expect(await StatusBanner.isComponentDisplayed()).toBe(true);
    });
});
