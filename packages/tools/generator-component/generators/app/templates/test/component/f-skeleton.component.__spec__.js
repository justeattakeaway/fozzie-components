const <%= name.filename %> = require('../../test-utils/component-objects/f-<%= name.default %>.component');

const <%= name.class %> = new <%= name.filename %>();

describe('f-<%= name.default %> component tests', () => {
    beforeEach(() => {
        <%= name.class %>.load();
    });

    it('should display the f-<%= name.default %> component', () => {
        // Assert
        expect(<%= name.class %>.isComponentDisplayed()).toBe(true);
    });
});
