import <%= name.filename %> from '../../test-utils/component-objects/f-<%= name.default %>.component';

describe('f-<%= name.default %> - Component tests', () => {
    it('should display the f-<%= name.default %> component', async () => {
        // Act
        await <%= name.filename %>.load();

        // Assert
        const result = await <%= name.filename %>.isComponentDisplayed();
        await expect(result).toBe(true);
    });
});
