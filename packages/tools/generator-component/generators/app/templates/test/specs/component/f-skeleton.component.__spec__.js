const <%= name.filename %> = require('../../../test-utils/component-objects/f-<%= name.class %>.component');
const <%= name.class %> = new <%= name.filename %>

describe('f-<%= name.class %> component tests', () => {
    beforeEach(() => {
        <%= name.class %>.open();
        <%= name.class %>.waitForComponent();
    });

    it('should display the f-<%= name.class %> component', () => {
        // Assert
        expect(<%= name.class %>.isComponentDisplayed()).toBe(true);
    });
});
