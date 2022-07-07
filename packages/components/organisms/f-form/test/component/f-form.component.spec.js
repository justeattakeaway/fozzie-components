import Form from '../../test-utils/component-objects/f-form.component';

describe('f-form component tests', () => {
    it('should display the f-form component', async () => {
        // Arrange
        await Form.load();

        // Assert
        await expect(await Form.isComponentDisplayed()).toBe(true);
    });
});
