/* eslint-disable class-methods-use-this */
import Spinner from '../../test-utils/component-objects/f-spinner.component';

describe('f-spinner component tests', () => {
    it('should display the f-spinner component', async () => {
        // Arrange
        await Spinner.load();

        // Assert
        await expect(await Spinner.isComponentDisplayed()).toBe(true);
    });
});
