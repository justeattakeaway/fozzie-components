const <%= name.filename %> = require('../../test-utils/component-objects/f-<%= name.default %>.component');

let <%= name.class %>;

describe('f-<%= name.default %> Mobile visual tests', () => {
    beforeEach(async () => {
        <%= name.class %> = new <%= name.filename %>();
        await <%= name.class %>.load();
    });

    it('should display the f-<%= name.default %> component', async () => {
        // Arrange
        const result = await <%= name.class %>.isComponentDisplayed();

        // Assert
        await browser.percyScreenshot('f-<%= name.default %> - Default Visual Test', 'mobile');
    });
});
