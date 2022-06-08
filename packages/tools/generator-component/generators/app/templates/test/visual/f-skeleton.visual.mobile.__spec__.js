const <%= name.filename %> = require('../../test-utils/component-objects/f-<%= name.default %>.component');

const <%= name.class %> = new <%= name.filename %>();

describe('f-<%= name.default %> Mobile visual tests', () => {
    beforeEach(async () => {
        await <%= name.class %>.load();
    });

    it('should display the f-<%= name.default %> component', async () => {
        // Arrange
        const result = await <%= name.class %>.isComponentDisplayed();

        // Assert
        expect(result).toBe(true);
    });
});
