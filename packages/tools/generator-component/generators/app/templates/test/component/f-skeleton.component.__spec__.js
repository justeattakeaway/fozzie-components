const <%= name.filename %> = require('../../test-utils/component-objects/f-<%= name.default %>.component');

describe('f-<%= name.default %> - Component tests', () => {
    let <%= name.class %>;

    beforeEach(() => {
        // Arrange
        <%= name.class %> = new <%= name.filename %>();
    });

    it('should display the f-<%= name.default %> component', async () => {
        // Act
        await <%= name.class %>.load();

        // Assert
        const result = await <%= name.class %>.isComponentDisplayed();
        expect(result).toBe(true);
    });
});
