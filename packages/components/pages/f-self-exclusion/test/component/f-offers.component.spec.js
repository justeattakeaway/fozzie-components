import SelfExclusion from '../../test-utils/component-objects/f-self-exclusion.component';

describe('f-self-exclusion component tests', () => {
    beforeEach(async () => {
        await SelfExclusion.load();
    });

    // SelfExclusion not currently working in Storybook.
    it.skip('should display the f-self-exclusion component', async () => {
        // Assert
        await expect(await SelfExclusion.isComponentDisplayed()).toBe(true);
    });
});
