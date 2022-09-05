import WdioTest from '../../test-utils/component-objects/f-wdio-test.component';
import Button from '@justeat/f-button/test-utils/component-objects/f-button--action.component';

describe('f-wdio-test - Component tests', () => {
    it('should display the f-wdio-test component', async () => {
        // Act
        await WdioTest.load();

        // Assert
        const result = await Button.isComponentDisplayed();
        await expect(result).toBe(true);
    });
});
